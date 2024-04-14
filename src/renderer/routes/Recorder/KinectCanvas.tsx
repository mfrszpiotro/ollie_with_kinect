// @ts-ignore
import * as Kinect2 from 'kinect2';
import { useEffect, useRef } from 'react';
import fs from 'fs';
import { json2csv } from 'json-2-csv';
import {
  BodyFrame,
  Body,
  MultiSourceFrame,
  CsvBody,
  JointType,
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

function extractCsvBody(bodyFrame: BodyFrame): CsvBody {
  const result = {} as CsvBody;
  const { bodies, floorClipPlane } = bodyFrame;
  result.Floor_x = floorClipPlane.x;
  result.Floor_y = floorClipPlane.y;
  result.Floor_z = floorClipPlane.z;
  result.Floor_w = floorClipPlane.w;
  // todo: figure out how to deal with multiple bodies in frame
  let bodyFound = null as Body | null;
  for (let i = 0; i < bodies.length; i += 1) {
    if (bodies[i].tracked) {
      bodyFound = bodies[i];
      break;
    }
  }
  if (bodyFound) {
    for (let i = 0; i < bodyFound.joints.length; i += 1) {
      const joint = bodyFound.joints[i];
      switch (joint.jointType) {
        case JointType.Head:
          result.Head_x = joint.cameraX;
          result.Head_y = joint.cameraY;
          result.Head_z = joint.cameraZ;
          break;
        case JointType.Neck:
          result.Neck_x = joint.cameraX;
          result.Neck_y = joint.cameraY;
          result.Neck_z = joint.cameraZ;
          break;
        case JointType.SpineShoulder:
          result.SpineShoulder_x = joint.cameraX;
          result.SpineShoulder_y = joint.cameraY;
          result.SpineShoulder_z = joint.cameraZ;
          break;
        case JointType.ShoulderLeft:
          result.ShoulderLeft_x = joint.cameraX;
          result.ShoulderLeft_y = joint.cameraY;
          result.ShoulderLeft_z = joint.cameraZ;
          break;
        case JointType.ElbowLeft:
          result.ElbowLeft_x = joint.cameraX;
          result.ElbowLeft_y = joint.cameraY;
          result.ElbowLeft_z = joint.cameraZ;
          break;
        case JointType.WristLeft:
          result.WristLeft_x = joint.cameraX;
          result.WristLeft_y = joint.cameraY;
          result.WristLeft_z = joint.cameraZ;
          break;
        case JointType.HandLeft:
          result.HandLeft_x = joint.cameraX;
          result.HandLeft_y = joint.cameraY;
          result.HandLeft_z = joint.cameraZ;
          break;
        case JointType.HandTipLeft:
          result.HandTipLeft_x = joint.cameraX;
          result.HandTipLeft_y = joint.cameraY;
          result.HandTipLeft_z = joint.cameraZ;
          break;
        case JointType.ThumbLeft:
          result.ThumbLeft_x = joint.cameraX;
          result.ThumbLeft_y = joint.cameraY;
          result.ThumbLeft_z = joint.cameraZ;
          break;
        case JointType.ShoulderRight:
          result.ShoulderRight_x = joint.cameraX;
          result.ShoulderRight_y = joint.cameraY;
          result.ShoulderRight_z = joint.cameraZ;
          break;
        case JointType.ElbowRight:
          result.ElbowRight_x = joint.cameraX;
          result.ElbowRight_y = joint.cameraY;
          result.ElbowRight_z = joint.cameraZ;
          break;
        case JointType.WristRight:
          result.WristRight_x = joint.cameraX;
          result.WristRight_y = joint.cameraY;
          result.WristRight_z = joint.cameraZ;
          break;
        case JointType.HandRight:
          result.HandRight_x = joint.cameraX;
          result.HandRight_y = joint.cameraY;
          result.HandRight_z = joint.cameraZ;
          break;
        case JointType.HandTipRight:
          result.HandTipRight_x = joint.cameraX;
          result.HandTipRight_y = joint.cameraY;
          result.HandTipRight_z = joint.cameraZ;
          break;
        case JointType.ThumbRight:
          result.ThumbRight_x = joint.cameraX;
          result.ThumbRight_y = joint.cameraY;
          result.ThumbRight_z = joint.cameraZ;
          break;
        case JointType.SpineMid:
          result.SpineMid_x = joint.cameraX;
          result.SpineMid_y = joint.cameraY;
          result.SpineMid_z = joint.cameraZ;
          break;
        case JointType.SpineBase:
          result.SpineBase_x = joint.cameraX;
          result.SpineBase_y = joint.cameraY;
          result.SpineBase_z = joint.cameraZ;
          break;
        case JointType.HipLeft:
          result.HipLeft_x = joint.cameraX;
          result.HipLeft_y = joint.cameraY;
          result.HipLeft_z = joint.cameraZ;
          break;
        case JointType.KneeLeft:
          result.KneeLeft_x = joint.cameraX;
          result.KneeLeft_y = joint.cameraY;
          result.KneeLeft_z = joint.cameraZ;
          break;
        case JointType.AnkleLeft:
          result.AnkleLeft_x = joint.cameraX;
          result.AnkleLeft_y = joint.cameraY;
          result.AnkleLeft_z = joint.cameraZ;
          break;
        case JointType.FootLeft:
          result.FootLeft_x = joint.cameraX;
          result.FootLeft_y = joint.cameraY;
          result.FootLeft_z = joint.cameraZ;
          break;
        case JointType.HipRight:
          result.HipRight_x = joint.cameraX;
          result.HipRight_y = joint.cameraY;
          result.HipRight_z = joint.cameraZ;
          break;
        case JointType.KneeRight:
          result.KneeRight_x = joint.cameraX;
          result.KneeRight_y = joint.cameraY;
          result.KneeRight_z = joint.cameraZ;
          break;
        case JointType.AnkleRight:
          result.AnkleRight_x = joint.cameraX;
          result.AnkleRight_y = joint.cameraY;
          result.AnkleRight_z = joint.cameraZ;
          break;
        case JointType.FootRight:
          result.FootRight_x = joint.cameraX;
          result.FootRight_y = joint.cameraY;
          result.FootRight_z = joint.cameraZ;
          break;
        default:
          throw new Error('Unexpected joint value');
      }
    }
  }
  return result;
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

    let recordedFrames = [] as BodyFrame[];
    let chunks = [] as any;
    let recordingStartTime = 0;
    const mediaRecorder = new MediaRecorder(streamCanvas, {
      videoBitsPerSecond: CANVAS_RECORDING_BPS,
    });
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = async () => {
      const recordedCsvBodies = recordedFrames.map((bodyFrame) =>
        extractCsvBody(bodyFrame),
      );
      const videoBlob = new Blob(chunks, { type: 'video/mp4' });
      chunks = [];
      const videoBuffer = Buffer.from(await videoBlob.arrayBuffer());
      fs.writeFile(`${recordingStartTime}.mp4`, videoBuffer, () => {
        console.log(`Your file has been saved to ${recordingStartTime}.mp4`);
      });
      const filenameJson = `${recordingStartTime}.json`;
      const framesToJsonString = JSON.stringify(recordedCsvBodies);
      fs.writeFile(filenameJson, framesToJsonString, 'utf8', () => {
        console.log(`Your file has been saved to ${filenameJson}`);
      });
      const filenameCsv = `${recordingStartTime}.csv`;
      const framesToCsvString = json2csv(recordedCsvBodies);
      fs.writeFile(filenameCsv, framesToCsvString, 'utf8', () => {
        console.log(`Your file has been saved to ${filenameCsv}`);
      });
      recordedFrames = [];
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
            recordedFrames.push(frame.body);
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
