import { Link } from 'react-router-dom';
import './Previewer.css';

const DEPTH_IMAGE_WIDTH = 512;
const DEPTH_IMAGE_HEIGHT = 424;

export default function Previewer() {
  return (
    <>
      <div className="center-by-table">
        <div className="outer">
          <div className="middle">
            <div id="previewer-container" className="inner">
              <div id="previewer-grid-left">
                <h2 id="previewer-title">preview:</h2>
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
              <div id="previewer-grid-right">
                <ul id="previewer-list">
                  <li>
                    <Link to="/recorder">
                      <button className="previewer-btn" type="button">
                        redo
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/report">
                      <button className="previewer-btn" type="button">
                        compare
                      </button>
                    </Link>
                  </li>
                  <li>
                    <div id="previewer-reference-container">
                      <h2 id="previewer-reference-text">w/ reference:</h2>
                      <div id="previewer-compare-selector">
                        <span id="previewer-compare-text">test.json</span>
                        <button className="btn-arrow" type="button">
                          .
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/recorder">
        <button className="btn-arrow" type="button">
          &larr;
        </button>
      </Link>
      <div style={{ position: 'fixed', bottom: '5px', right: '5px' }}>
        <Link to="/menu">
          <button type="button">menu</button>
        </Link>
      </div>
    </>
  );
}
