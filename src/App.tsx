import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

export default function App() {
  return (
    <Routes>
      <Route path="/2" element={<Home />} />
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      {/* <Route path="*" element={<div>not found</div>} /> */}
    </Routes>
  );
}
