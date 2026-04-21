import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../src/components/SignIn";
import SignUp from "../src/components/SignUp";
import Dashboard from "../src/components/Dashboard";
import { AuthProvider } from '../src/components/AuthContext';
import { SpeedInsights } from '@vercel/speed-insights/react';


function App() {
  return (
    <AuthProvider>
      <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>
    <SpeedInsights />
    </AuthProvider>
    
  );
}

export default App;