import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../src/components/SignIn";
import SignUp from "../src/components/SignUp";
import Dashboard from "../src/components/Dashboard";
import ProtectedRoute from "../src/components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;