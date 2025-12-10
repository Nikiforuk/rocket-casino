import { Routes, Route } from 'react-router-dom';

import { PrivateRoute } from './features/auth/components/PrivateRoute';
import Toast from './features/toast/Toast';
import Board from './pages/Board';
import Signin from './pages/SignIn';
import SignUp from './pages/SignUp';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Board />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toast />
    </>
  );
}
