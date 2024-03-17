import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/record">record your ollie</Link>
        </li>
        <li>
          <Link to="/compare">compare with other</Link>
        </li>
        <li>
          <Link to="/saved">view saved comparisons</Link>
        </li>
        <li>
          <Link to="/">back to start</Link>
        </li>
      </ul>
    </div>
  );
}
