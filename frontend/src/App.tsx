import "./App.css";
import Navbar from "./app/components/navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="buttons-container">
        <button className="login-button">Iniciar sesión</button>
        <button className="register-button">Registrarse</button>
      </div>
    </div>
  );
}

export default App;
