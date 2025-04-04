import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import path from 'path';
import Start from './routes/Start/Start';
import Menu from './routes/Menu/Menu';
import Report from './routes/Report/Report';
import Recorder from './routes/Recorder/Recorder';
import Previewer from './routes/Previewer/Previewer';
import Browser from './routes/Browser/Browser';
import { ComparisonBuilder } from './routes/comparison_interfaces';

export default function App() {
  const [currentReportFilepath, setCurrentReportFilepath] = useState(
    path.join(process.cwd(), 'comparison.json'),
  );
  const [comparisonBuilder, setComparisonBuilder] = useState(
    {} as ComparisonBuilder,
  );
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="/menu"
          element={<Menu onRender={setComparisonBuilder} />}
        />
        <Route
          path="/report"
          element={<Report currentReportFilepath={currentReportFilepath} />}
        />
        <Route
          path="/browser"
          element={
            <Browser
              comparisonBuilder={comparisonBuilder}
              onNextClicked={setComparisonBuilder}
            />
          }
        />
        <Route
          path="/browser/recorder"
          element={
            <Recorder
              comparisonBuilder={comparisonBuilder}
              onNextClicked={setComparisonBuilder}
            />
          }
        />
        <Route
          path="/browser/recorder/previewer"
          element={
            <Previewer
              comparisonBuilder={comparisonBuilder}
              onCompareClicked={setCurrentReportFilepath}
            />
          }
        />
      </Routes>
    </Router>
  );
}
