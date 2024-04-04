import { Link } from 'react-router-dom';
import './Start.css';

export default function Start() {
  return (
    <div className="center-by-table">
      <div className="outer">
        <div className="middle">
          <div className="inner">
            <div id="start-title-container">
              <h1 id="start-title">ollie with kinect</h1>
              <Link to="menu">
                <button type="button">
                  <p id="start-btn-label">start</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
