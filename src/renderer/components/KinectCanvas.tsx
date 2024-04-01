// @ts-ignore
import * as Kinect2 from 'kinect2';
import { useEffect, useRef } from 'react';
import { BodyFrame, Body, MultiSourceFrame } from '../../kinect_interfaces';

const DEPTH_IMAGE_WIDTH = 512;
const DEPTH_IMAGE_HEIGHT = 424;
const DEPTH_IMAGE_AND_BODY_KINECT_CONFIG =
  Kinect2.FrameType.depth | Kinect2.FrameType.body;
const COLORS = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#00ffff',
  '#ff00ff',
];

function renderDepthFrame(
  ctx: CanvasRenderingContext2D,
  canvasImageData: ImageData,
  newPixelData: Uint8ClampedArray,
) {
  const pixelArray = canvasImageData.data;
  let depthPixelIndex = 0;
  for (let i = 0; i < canvasImageData.data.length; i += 4) {
    pixelArray[i + 0] = newPixelData[depthPixelIndex];
    pixelArray[i + 1] = newPixelData[depthPixelIndex];
    pixelArray[i + 2] = newPixelData[depthPixelIndex];
    pixelArray[i + 3] = 0xff;
    depthPixelIndex += 1;
  }
  ctx.putImageData(canvasImageData, 0, 0);
}

function renderBodyFrame(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  bodyFrame: BodyFrame,
  isColor: Boolean,
) {
  let index = 0;
  bodyFrame.bodies.forEach((body: Body) => {
    if (body.tracked) {
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (const jointType in body.joints) {
        const joint = body.joints[jointType];
        if (joint.trackingState > Kinect2.TrackingState.notTracked) {
          ctx.fillStyle = COLORS[index];
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
      index += 1;
    }
  });
}

export default function KinectCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const kinect = new Kinect2();
    const context = canvasRef.current?.getContext('2d');
    if (context && kinect.open()) {
      kinect.openMultiSourceReader({
        frameTypes: DEPTH_IMAGE_AND_BODY_KINECT_CONFIG,
      });
      const depthImageData = context.createImageData(
        DEPTH_IMAGE_WIDTH,
        DEPTH_IMAGE_HEIGHT,
      );
      kinect.on('multiSourceFrame', (frame: MultiSourceFrame) => {
        if (frame?.depth?.buffer) {
          renderDepthFrame(context, depthImageData, frame.depth.buffer);
        }
        if (frame.body) {
          renderBodyFrame(context, context.canvas, frame.body, false);
        }
      });
    }
    return () => {
      kinect.close();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={DEPTH_IMAGE_WIDTH}
      height={DEPTH_IMAGE_HEIGHT}
    />
  );
}
