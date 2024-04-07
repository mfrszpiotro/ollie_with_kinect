// @ts-ignore
import * as Kinect2 from 'kinect2';
import { useEffect, useRef } from 'react';
import fs from 'fs';
import { json2csv } from 'json-2-csv';
import {
  BodyFrame,
  Body,
  MultiSourceFrame,
  Joint,
} from '../../../kinect_interfaces';

const CANVAS_RECORDING_BPS = 5000000;
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const stopButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const kinect = new Kinect2();
    const context = canvasRef.current?.getContext('2d');
    const streamCanvas = canvasRef.current?.captureStream(60) as MediaStream;
    const currentVideo = videoRef.current as HTMLVideoElement;
    const currentStartButton = startButtonRef.current as HTMLButtonElement;
    const currentStopButton = stopButtonRef.current as HTMLButtonElement;

    let recordedJoints = [] as Joint[][];
    let chunks = [] as any;
    let recordingStartTime = 0;
    const mediaRecorder = new MediaRecorder(streamCanvas, {
      videoBitsPerSecond: CANVAS_RECORDING_BPS,
    });
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = async () => {
      const videoBlob = new Blob(chunks, { type: 'video/mp4' });
      chunks = [];
      const videoBuffer = Buffer.from(await videoBlob.arrayBuffer());
      fs.writeFile(`${recordingStartTime}.mp4`, videoBuffer, () => {
        console.log(`Your file has been saved to ${recordingStartTime}.mp4`);
      });
      const filenameJson = `${recordingStartTime}.json`;
      const framesToJsonString = JSON.stringify(recordedJoints);
      fs.writeFile(filenameJson, framesToJsonString, 'utf8', () => {
        console.log(`Your file has been saved to ${filenameJson}`);
      });
      const filenameCsv = `${recordingStartTime}.csv`;
      const framesToCsvString = json2csv(recordedJoints);
      fs.writeFile(filenameCsv, framesToCsvString, 'utf8', () => {
        console.log(`Your file has been saved to ${filenameCsv}`);
      });
      recordedJoints = [];
      recordingStartTime = 0;
      const videoURL = URL.createObjectURL(videoBlob);
      currentVideo.src = videoURL;
    };
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    currentStartButton.onclick = () => {
      recordingStartTime = Date.now();
      mediaRecorder.start();
    };
    currentStopButton.onclick = () => {
      mediaRecorder.stop();
    };

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
          if (mediaRecorder.state === 'recording') {
            // eslint-disable-next-line no-restricted-syntax
            const { bodies } = frame.body;
            for (let i = 0; i < frame.body.bodies.length; i += 1) {
              if (bodies[i].tracked) recordedJoints.push(bodies[i].joints);
            }
          }
        }
      });
    }
    return () => {
      kinect.close();
    };
  }, []);

  return (
    <>
      <div
        className="kinect-output-container"
        style={{ width: DEPTH_IMAGE_WIDTH, height: DEPTH_IMAGE_HEIGHT }}
      >
        <canvas
          ref={canvasRef}
          width={DEPTH_IMAGE_WIDTH}
          height={DEPTH_IMAGE_HEIGHT}
        />
      </div>
      <div style={{ textAlign: 'left' }}>
        <button className="btn-arrow" ref={startButtonRef} type="button">
          &#8919;
        </button>
        <button className="btn-arrow" ref={stopButtonRef} type="button">
          &#8718;
        </button>
        <button className="btn-arrow" disabled type="button">
          00:00
        </button>
      </div>
      {/* Preview: */}
      <div style={{ display: 'none' }}>
        <video ref={videoRef} autoPlay controls>
          <track kind="captions" />
        </video>
      </div>
    </>
  );
}
