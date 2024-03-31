/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-bitwise */
/* eslint-disable no-use-before-define */
// @ts-ignore
import * as Kinect2 from 'kinect2';
import { BodyFrame, Body, MultiSourceFrame } from '../../kinect_interfaces';

export default function KinectCanvas() {
  const handleOnClick = () => {
    const kinect = new Kinect2();

    const $rgbCanvas = document.getElementById(
      'rgbCanvas',
    ) as HTMLCanvasElement;
    const rgbCtx = $rgbCanvas.getContext('2d') as CanvasRenderingContext2D;
    const rgbImageData = rgbCtx.createImageData(
      $rgbCanvas.width,
      $rgbCanvas.height,
    );

    const $depthCanvas = document.getElementById(
      'depthCanvas',
    ) as HTMLCanvasElement;
    const depthCtx = $depthCanvas.getContext('2d') as CanvasRenderingContext2D;
    const depthImageData = depthCtx.createImageData(
      $depthCanvas.width,
      $depthCanvas.height,
    );

    const colors = [
      '#ff0000',
      '#00ff00',
      '#0000ff',
      '#ffff00',
      '#00ffff',
      '#ff00ff',
    ];

    const $toggleFeedButton = document.getElementById(
      'toggleFeedButton',
    ) as HTMLButtonElement;

    let feedOpen = false;

    const init = () => {
      startKinect();
    };

    const setFeedOpen = async (desiredFeedOpen: boolean) => {
      if (desiredFeedOpen !== feedOpen) {
        feedOpen = desiredFeedOpen;
        if (feedOpen) {
          kinect.openMultiSourceReader({
            frameTypes:
              Kinect2.FrameType.color |
              Kinect2.FrameType.depth |
              Kinect2.FrameType.body,
          });
          $toggleFeedButton.textContent = 'Stop Video';
        } else {
          await kinect.closeMultiSourceReader();
          $toggleFeedButton.textContent = 'Start Video';
        }
      }
    };

    const startKinect = () => {
      if (kinect.open()) {
        kinect.on('multiSourceFrame', (frame: MultiSourceFrame) => {
          if (frame?.color?.buffer) {
            renderColorFrame(rgbCtx, rgbImageData, frame.color.buffer);
          }
          if (frame?.depth?.buffer) {
            renderDepthFrame(depthCtx, depthImageData, frame.depth.buffer);
          }
          if (frame.body) {
            renderBodyFrame(rgbCtx, $rgbCanvas, frame.body, true);
            renderBodyFrame(depthCtx, $depthCanvas, frame.body, false);
          }
        });

        $toggleFeedButton.addEventListener('click', () => {
          setFeedOpen(!feedOpen);
        });

        $toggleFeedButton.removeAttribute('disabled');

        setFeedOpen(true);
      }
    };

    const renderColorFrame = (
      ctx: CanvasRenderingContext2D,
      canvasImageData: ImageData,
      newPixelData: Uint8ClampedArray,
    ) => {
      const pixelArray = canvasImageData.data;
      for (let i = 0; i < canvasImageData.data.length; i++) {
        pixelArray[i] = newPixelData[i];
      }
      ctx.putImageData(canvasImageData, 0, 0);
    };

    const renderDepthFrame = (
      ctx: CanvasRenderingContext2D,
      canvasImageData: ImageData,
      newPixelData: Uint8ClampedArray,
    ) => {
      const pixelArray = canvasImageData.data;
      let depthPixelIndex = 0;
      for (let i = 0; i < canvasImageData.data.length; i += 4) {
        pixelArray[i + 0] = newPixelData[depthPixelIndex];
        pixelArray[i + 1] = newPixelData[depthPixelIndex];
        pixelArray[i + 2] = newPixelData[depthPixelIndex];
        pixelArray[i + 3] = 0xff;
        depthPixelIndex++;
      }
      ctx.putImageData(canvasImageData, 0, 0);
    };

    const renderBodyFrame = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      bodyFrame: BodyFrame,
      isColor: Boolean,
    ) => {
      let index = 0;
      bodyFrame.bodies.forEach((body: Body) => {
        if (body.tracked) {
          for (const jointType in body.joints) {
            const joint = body.joints[jointType];
            if (joint.trackingState > Kinect2.TrackingState.notTracked) {
              ctx.fillStyle = colors[index];
              let size = 4;
              if (joint.trackingState === Kinect2.TrackingState.tracked) {
                size = 12;
              }
              if (isColor) {
                ctx.fillRect(
                  joint.colorX * canvas.width - size / 2,
                  joint.colorY * canvas.height - size / 2,
                  size,
                  size,
                );
              } else {
                ctx.fillRect(
                  joint.depthX * canvas.width - size / 2,
                  joint.depthY * canvas.height - size / 2,
                  size,
                  size,
                );
              }
            }
          }
          index++;
        }
      });
    };

    // expose the kinect instance to the window object in this demo app to allow the parent window to close it between sessions
    window.kinect = kinect;
    init();
  };

  return (
    <div>
      <button type="button" onClick={handleOnClick}>
        Run Kinect instance
      </button>
      <div>
        <h1>Multi Source Stream</h1>
      </div>
      <p>This demo shows multiple streams.</p>

      <div>
        <div>
          <p>Depth image:</p>
          <canvas id="depthCanvas" width="512" height="424" />
          {/* <CanvasRecorder /> */}
        </div>
        <div>
          <p>Color image:</p>
          <canvas id="rgbCanvas" width="1920" height="1080" />
        </div>
      </div>
      <button type="button" id="toggleFeedButton" disabled>
        Stop Video
      </button>
    </div>
  );
}
