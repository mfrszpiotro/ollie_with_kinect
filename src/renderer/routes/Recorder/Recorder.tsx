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
              <div style={{ textAlign: 'left' }}>
                <button className="btn-arrow" type="button">.</button>
                <button className="btn-arrow" disabled type="button">
                  00:00
                </button>
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
    </>
  );
}
