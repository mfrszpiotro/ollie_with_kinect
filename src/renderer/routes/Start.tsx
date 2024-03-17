import { Link } from 'react-router-dom';

export default function Start() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/menu">Next</Link>
        </li>
        <li>
          <Link to="/test">Test</Link>
        </li>
      </ul>
    </div>
  );
}
