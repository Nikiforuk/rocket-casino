import { Routes, Route } from 'react-router-dom';

import { PrivateRoute } from './features/auth/components/PrivateRoute';
import Toast from './features/toast/Toast';
import Board from './pages/Board';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
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
