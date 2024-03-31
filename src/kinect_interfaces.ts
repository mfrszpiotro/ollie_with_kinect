// ***
// * Typescript interfaces for kinect2@0.2.3 npm package (https://github.com/wouterverweirder/kinect2)
// ***
// number/string types mostly from floats/chars with some exceptions (see: other comments)
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
