import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './routes/Test';
import Start from './routes/Start/Start';
import Menu from './routes/Menu/Menu';
import Report from './routes/Report/Report';
import Record from './routes/Recorder/Recorder';
import './App.css';
import Previewer from './routes/Previewer/Previewer';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/test" element={<Test />} />
        <Route path="/report" element={<Report />} />
        <Route path="/recorder" element={<Record />} />
        <Route path="/recorder/previewer" element={<Previewer />} />
        <Route path="/saved" element={<Menu />} />
      </Routes>
    </Router>
  );
}
