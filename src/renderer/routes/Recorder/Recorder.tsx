import { Link } from 'react-router-dom';
import './Recorder.css';
import KinectCanvas from '../../components/KinectCanvas';

export default function Recorder() {
  return (
    <>
      <div className="center-by-table">
        <div className="outer">
          <div className="middle">
            <div id="recorder-container" className="inner">
              <h2 id="recorder-title">kinect output:</h2>
              <div>
                <KinectCanvas />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/menu">
        <button className="btn-arrow" type="button">
          &larr;
        </button>
      </Link>
      <div style={{ position: 'fixed', bottom: '5px', right: '5px' }}>
        <Link to="/recorder/previewer">
          <button type="button">next</button>
        </Link>
      </div>
    </>
  );
}