import { Link } from 'react-router-dom';
import './Browser.css';
import SearchPanel from './SearchPanel';

const DEPTH_IMAGE_WIDTH = 512;
const DEPTH_IMAGE_HEIGHT = 424;

export default function Browser() {
  return (
    <>
      <div className="center-by-table">
        <div className="outer">
          <div className="middle">
            <div id="browser-container" className="inner">
              <div
                id="browser-grid-left"
                style={{
                  height: DEPTH_IMAGE_HEIGHT,
                }}
              >
                <SearchPanel />
              </div>
              <div id="browser-grid-right">
                <h2 id="browser-title">preview:</h2>
                <video
                  style={{
                    width: DEPTH_IMAGE_WIDTH,
                    height: DEPTH_IMAGE_HEIGHT,
                  }}
                  autoPlay
                  controls
                >
                  <track kind="captions" />
                </video>
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
        <Link to="/recorder">
          <button type="button">record</button>
        </Link>
      </div>
    </>
  );
}
