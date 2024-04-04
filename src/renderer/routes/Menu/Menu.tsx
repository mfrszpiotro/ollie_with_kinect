import { Link } from 'react-router-dom';
import './Menu.css';

export default function Menu() {
  return (
    <div className="center-by-table">
      <div className="outer">
        <div className="middle">
          <div id="menu-container" className="inner">
            <div>
              <ul id="menu-list">
                <li>
                  <Link to="/recorder">
                    <button className="menu-btn" type="button">
                      record your ollie
                    </button>
                  </Link>
                </li>
                <li>
                  {/* /compare */}
                  <Link to="/test">
                    <button className="menu-btn" type="button">
                      test functionalities
                      {/* compare with other */}
                    </button>
                  </Link>
                </li>
                <li>
                  {/* /saved */}
                  <Link to="/report">
                    <button className="menu-btn" type="button">
                      test report
                      {/* view saved comparisons */}
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <button className="menu-btn" type="button">
                      back to start page
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
