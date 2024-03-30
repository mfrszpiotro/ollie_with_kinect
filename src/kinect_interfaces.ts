// number/string types mostly from floats/chars with some exceptions (see: other comments)
export interface Joint {
  depthX: number;
  depthY: number;
  colorX: number;
  colorY: number;
  cameraX: number;
  cameraY: number;
  cameraZ: number;
  hasFloorData: boolean; // bool
  floorDepthX: number;
  floorDepthY: number;
  floorColorX: number;
  floorColorY: number;
  floorCameraX: number;
  floorCameraY: number;
  floorCameraZ: number;
  orientationX: number;
  orientationY: number;
  orientationZ: number;
  orientationW: number;
  jointType: number; // int
  trackingState: string;
}

export interface Body {
  tracked: boolean;
  hasPixels: boolean;
  trackingId: number; // UINT64
  leftHandState: string;
  rightHandState: string;
  joints: Joint[];
}

export interface BodyFrame {
  bodies: Body[];
  hasFloorClipPlane: boolean;
  floorClipPlaneX: number;
  floorClipPlaneY: number;
  floorClipPlaneZ: number;
  floorClipPlaneW: number;
  cameraAngle: number;
  cosCameraAngle: number;
  sinCameraAngle: number;
}

// export interface MultiSourceFrame {} todo
