import { Link } from 'react-router-dom';
import './Start.css';

export default function Start() {
  return (
    <div>
      <h1 className="start-title">ollie with kinect</h1>
      <Link to="menu">
        <button type="button">start</button>
      </Link>
    </div>
  );
}
