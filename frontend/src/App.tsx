import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppNavbar from "./app/components/layout/navbar";
import Home from "./app/components/pages/Home";
import VerifyEmail from "./app/components/auth/VerifyEmail";
import Profile from "./app/components/pages/Profile";

function App() {
  return (
    <div className="app">
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;