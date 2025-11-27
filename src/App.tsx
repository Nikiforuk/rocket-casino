import { Routes, Route } from 'react-router-dom';

import { PrivateRoute } from './features/auth/components/PrivateRoute';
import Home from './pages/Home';
import Signin from './pages/Signin';
import SignUp from './pages/Signup';

export default function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
