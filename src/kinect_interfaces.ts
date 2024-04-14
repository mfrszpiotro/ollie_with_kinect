/* eslint-disable no-unused-vars */
// ***
// * Typescript interfaces for kinect2@0.2.3 npm package (https://github.com/wouterverweirder/kinect2)
// ***
// NOTE: number/string types mostly from floats/chars with some exceptions (see: other comments)
export interface Joint {
  depthX: number;
  depthY: number;
  colorX: number;
  colorY: number;
  cameraX: number;
  cameraY: number;
  cameraZ: number;
  orientationX: number;
  orientationY: number;
  orientationZ: number;
  orientationW: number;
  jointType: number; // int
  trackingState: number; // char
}

export interface Body {
  bodyIndex: number;
  tracked: boolean; // if tracked then the rest of properties below shouldn't be null
  trackingId: string; // UINT64
  leftHandState: string;
  rightHandState: string;
  joints: Joint[];
}

export interface BodyFrame {
  bodies: Body[];
  floorClipPlane: {
    w: number;
    x: number;
    y: number;
    z: number;
  };
}

export interface ColorFrame {
  buffer: Uint8ClampedArray;
  diagonalFieldOfView: number;
  verticalFieldOfView: number;
  horizontalFieldOfView: number;
}

export interface DepthFrame {
  buffer: Uint8ClampedArray;
  diagonalFieldOfView: number;
  verticalFieldOfView: number;
  horizontalFieldOfView: number;
}

export interface MultiSourceFrame {
  body: BodyFrame;
  color: ColorFrame;
  depth: DepthFrame;
}

// helper interfaces:

export enum JointType {
  SpineBase = 0,
  SpineMid = 1,
  Neck = 2,
  Head = 3,
  ShoulderLeft = 4,
  ElbowLeft = 5,
  WristLeft = 6,
  HandLeft = 7,
  ShoulderRight = 8,
  ElbowRight = 9,
  WristRight = 10,
  HandRight = 11,
  HipLeft = 12,
  KneeLeft = 13,
  AnkleLeft = 14,
  FootLeft = 15,
  HipRight = 16,
  KneeRight = 17,
  AnkleRight = 18,
  FootRight = 19,
  SpineShoulder = 20,
  HandTipLeft = 21,
  ThumbLeft = 22,
  HandTipRight = 23,
  ThumbRight = 24,
}

export interface CsvBody {
  Time: number;
  SpineBase_x: number;
  SpineBase_y: number;
  SpineBase_z: number;
  SpineMid_x: number;
  SpineMid_y: number;
  SpineMid_z: number;
  Neck_x: number;
  Neck_y: number;
  Neck_z: number;
  Head_x: number;
  Head_y: number;
  Head_z: number;
  ShoulderLeft_x: number;
  ShoulderLeft_y: number;
  ShoulderLeft_z: number;
  ElbowLeft_x: number;
  ElbowLeft_y: number;
  ElbowLeft_z: number;
  WristLeft_x: number;
  WristLeft_y: number;
  WristLeft_z: number;
  HandLeft_x: number;
  HandLeft_y: number;
  HandLeft_z: number;
  ShoulderRight_x: number;
  ShoulderRight_y: number;
  ShoulderRight_z: number;
  ElbowRight_x: number;
  ElbowRight_y: number;
  ElbowRight_z: number;
  WristRight_x: number;
  WristRight_y: number;
  WristRight_z: number;
  HandRight_x: number;
  HandRight_y: number;
  HandRight_z: number;
  HipLeft_x: number;
  HipLeft_y: number;
  HipLeft_z: number;
  KneeLeft_x: number;
  KneeLeft_y: number;
  KneeLeft_z: number;
  AnkleLeft_x: number;
  AnkleLeft_y: number;
  AnkleLeft_z: number;
  FootLeft_x: number;
  FootLeft_y: number;
  FootLeft_z: number;
  HipRight_x: number;
  HipRight_y: number;
  HipRight_z: number;
  KneeRight_x: number;
  KneeRight_y: number;
  KneeRight_z: number;
  AnkleRight_x: number;
  AnkleRight_y: number;
  AnkleRight_z: number;
  FootRight_x: number;
  FootRight_y: number;
  FootRight_z: number;
  SpineShoulder_x: number;
  SpineShoulder_y: number;
  SpineShoulder_z: number;
  HandTipLeft_x: number;
  HandTipLeft_y: number;
  HandTipLeft_z: number;
  ThumbLeft_x: number;
  ThumbLeft_y: number;
  ThumbLeft_z: number;
  HandTipRight_x: number;
  HandTipRight_y: number;
  HandTipRight_z: number;
  ThumbRight_x: number;
  ThumbRight_y: number;
  ThumbRight_z: number;
  Floor_x: number;
  Floor_y: number;
  Floor_z: number;
  Floor_w: number;
}
