import { Link } from 'react-router-dom';
import RunComparisonButton from '../components/test_buttons/runComparisonButton';
import SelectFilepathButton from '../components/test_buttons/selectFilepathButton';
import KinectCanvas from '../components/kinect_recording/KinectCanvas';

export default function Test() {
  return (
    <div>
      <Link to="/">back to start</Link>
      <div className="d-flex align-items-baseline justify-content-between">
        <h1 className="bd-title">Color Stream</h1>
      </div>
      <p>This demo shows the color stream in an html canvas element.</p>
      <RunComparisonButton>Test comparison</RunComparisonButton>
      <SelectFilepathButton>Test selecting filepath</SelectFilepathButton>
      <KinectCanvas />
    </div>
  );
}
