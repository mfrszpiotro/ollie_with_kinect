import { Link } from 'react-router-dom';
import './Record.css';

export default function Record() {
  return (
    <>
      <div className="center-by-table">
        <div className="outer">
          <div className="middle">
            <div className="inner">
              <div>
                <h1>record test</h1>
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
