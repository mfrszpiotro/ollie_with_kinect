import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './routes/Test';
import Start from './routes/Start/Start';
import Menu from './routes/Menu';
import Report from './routes/Report/Report';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/test" element={<Test />} />
        <Route path="/report" element={<Report />} />
        <Route path="/record" element={<Menu />} />
        <Route path="/compare" element={<Menu />} />
        <Route path="/saved" element={<Menu />} />
      </Routes>
    </Router>
  );
}
