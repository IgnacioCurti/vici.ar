import React from 'react';
import Header from './pages/header';
import Footer from './pages/footer';
import FeaturedGames from './pages/featuredgames';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <FeaturedGames/>
      <Footer />
    </div>
  );
}

export default App;