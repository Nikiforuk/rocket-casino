import { Routes, Route } from 'react-router-dom';

import Auth from './pages/Auth';
import Home from './pages/Home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      {/* <Route path="*" element={<div>not found</div>} /> */}
    </Routes>
  );
}
