import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './routes/Test';
import Start from './routes/Start';
import Menu from './routes/Menu';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/test" element={<Test />} />
        <Route path="/record" element={<Menu />} />
        <Route path="/compare" element={<Menu />} />
        <Route path="/saved" element={<Menu />} />
      </Routes>
    </Router>
  );
}
