import React from 'react';
import './App.css';
import Navbar from './app/components/navbar';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className='buttoms'>
        <button className='ini'>Iniciar sesión</button>
        <button className='reg'>Registrarse</button>
      </div>
    </div>
  );
}

export default App;