import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./app/components/layout/navbar";
import Home from "./app/components/pages/Home";
import Register from "./app/components/pages/Register";
// import Login from "./app/pages/Login";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>

      </div>
    </Router>
  );
}

export default App;

