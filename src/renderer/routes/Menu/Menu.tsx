import { Link } from 'react-router-dom';
import './Menu.css';
import { ComparisonBuilder } from '../comparison_interfaces';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onRender: (comp: ComparisonBuilder) => void;
}

export default function Menu({ onRender }: Props) {
  return (
    <div className="center-by-table">
      <div className="outer">
        <div className="middle">
          <div id="menu-container" className="inner">
            <div>
              <ul id="menu-list">
                <li>
                  <Link
                    to="/browser/recorder"
                    onClick={() => {
                      onRender({} as ComparisonBuilder);
                    }}
                  >
                    <button className="menu-btn" type="button">
                      record your ollie
                    </button>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browser"
                    onClick={() => {
                      onRender({} as ComparisonBuilder);
                    }}
                  >
                    <button className="menu-btn" type="button">
                      compare it w/ others
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/report">
                    <button className="menu-btn" type="button">
                      test report
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
