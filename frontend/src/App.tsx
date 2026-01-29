import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppNavbar from "./app/components/layout/navbar";
import Home from "./app/components/pages/Home";
// import Login from "./app/pages/Login";

function App() {
  return (
    <div className="app">
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </div>
  );
}

export default App;