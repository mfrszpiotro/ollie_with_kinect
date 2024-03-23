import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div>
      <Link to="/">
        <button className="btn-arrow" type="button">
          &larr;
        </button>
      </Link>
      <ul>
        <li>
          <Link to="/test">
            <button type="button">test</button>
          </Link>
        </li>
        <li>
          <Link to="/report">
            <button type="button">test report</button>
          </Link>
        </li>
        <li>
          <Link to="/record">
            <button type="button">record your ollie</button>
          </Link>
        </li>
        <li>
          <Link to="/compare">
            <button type="button">compare with other</button>
          </Link>
        </li>
        <li>
          <Link to="/saved">
            <button type="button">view saved comparisons</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
