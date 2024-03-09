import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import RunComparisonButton from './test_buttons/runComparisonButton';
import SelectFilepathButton from './test_buttons/selectFilepathButton';
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
      <div>
        <canvas
          id="outputCanvas"
          width="1920"
          height="1080"
          className="img-fluid"
        />
      </div>
      <div className="mb-3">
        <button type="button" id="toggleFeedButton">
          Stop Video
        </button>
      </div>
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
