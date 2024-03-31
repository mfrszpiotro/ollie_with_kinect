import { useState } from 'react';

export default function CanvasRecorder() {
  const depthCanvas = document.getElementById(
    'depthCanvas',
  ) as HTMLCanvasElement;
  const video = document.querySelector('video') as HTMLVideoElement;
  const videoStream = depthCanvas.captureStream(30);
  const mediaRecorder = new MediaRecorder(videoStream);
  let chunks = [] as any;
  mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };
  mediaRecorder.onstop = () => {
    const fileBlob = new Blob(chunks, { type: 'video/mp4' });
    chunks = [];
    const videoURL = URL.createObjectURL(fileBlob);
    video.src = videoURL;
  };
  mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };

  const [isRecording, setIsRecording] = useState(false);
  const handleRecordingStart = () => {
    mediaRecorder.start();
    setIsRecording(true);
  };

  const handleRecordingStop = () => {
    mediaRecorder.stop();
    setIsRecording(false);
  };

  return (
    <div>
      <canvas id="depthCanvas" width="512" height="424" />
      <button
        id="start"
        type="button"
        onClick={handleRecordingStart}
        disabled={isRecording}
      >
        Start recording
      </button>
      <button
        id="stop"
        type="button"
        onClick={handleRecordingStop}
        disabled={!isRecording}
      >
        Stop recording
      </button>
      <video autoPlay controls>
        <track kind="captions" />
      </video>
    </div>
  );
}
