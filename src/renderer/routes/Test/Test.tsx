import { Link } from 'react-router-dom';
import RunComparisonButton from './runComparisonButton';
import SelectFilepathButton from './selectFilepathButton';
import KinectCanvas from '../Recorder/KinectCanvas';

export default function Test() {
  return (
    <div>
      <Link to="/">
        <button className="btn-arrow" type="button">
          &larr;
        </button>
      </Link>
      <div>
        <h1>Testing functionalities</h1>
      </div>
      <p>This demo shows main functionalites of the app</p>
      <RunComparisonButton>Test comparison</RunComparisonButton>
      <SelectFilepathButton>Test selecting filepath</SelectFilepathButton>
      <div>
        <KinectCanvas />
      </div>
    </div>
  );
}
