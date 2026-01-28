import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./app/components/layout/navbar";
import Home from "./app/components/pages/Home";
// import Login from "./app/pages/Login";
import { HeroUIProvider } from "@heroui/react";

function App() {
  return (
    <HeroUIProvider>
      <Router>
        <div className="app">
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login />} /> */}
          </Routes>
        </div>
      </Router>
    </HeroUIProvider>
  );
}

export default App;
