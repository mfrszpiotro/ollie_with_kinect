/* eslint-disable no-use-before-define */
export default function KinectCanvas() {
  const handleOnClick = () => {
    // eslint-disable-next-line global-require
    const Kinect2 = require('kinect2');
    const kinect = new Kinect2();

    const $outputCanvas = document.getElementById('outputCanvas');
    const outputCtx = $outputCanvas.getContext('2d');
    const outputImageData = outputCtx.createImageData(
      $outputCanvas.width,
      $outputCanvas.height,
    );

    const $toggleFeedButton = document.getElementById('toggleFeedButton');

    let feedOpen = false;

    const init = () => {
      startKinect();
    };

    const setFeedOpen = async (value) => {
      if (value !== feedOpen) {
        feedOpen = value;
        if (feedOpen) {
          kinect.openColorReader();
          $toggleFeedButton.textContent = 'Stop Video';
        } else {
          await kinect.closeColorReader();
          $toggleFeedButton.textContent = 'Start Video';
        }
      }
    };

    const startKinect = () => {
      if (kinect.open()) {
        kinect.on('colorFrame', (newPixelData) => {
          renderColorFrame(outputCtx, outputImageData, newPixelData);
        });

        $toggleFeedButton.addEventListener('click', () => {
          setFeedOpen(!feedOpen);
        });

        $toggleFeedButton.removeAttribute('disabled');

        setFeedOpen(true);
      }
    };

    const renderColorFrame = (ctx, canvasImageData, newPixelData) => {
      const pixelArray = canvasImageData.data;
      for (let i = 0; i < canvasImageData.data.length; i += 1) {
        pixelArray[i] = newPixelData[i];
      }
      ctx.putImageData(canvasImageData, 0, 0);
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
      <canvas
        id="outputCanvas"
        width="1920"
        height="1080"
        className="img-fluid"
      />
      <div className="mb-3">
        <button type="button" id="toggleFeedButton">
          Stop Video
        </button>
      </div>
    </div>
  );
}
