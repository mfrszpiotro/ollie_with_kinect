import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import RunComparisonButton from './test_buttons/runComparisonButton';
import SelectFilepathButton from './test_buttons/selectFilepathButton';
import KinectCanvas from './kinect_recording/KinectCanvas';
// import icon from '../../assets/icon.svg';
// import './App.css';

function Hello() {
  return (
    <div>
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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
