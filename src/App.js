// App.js

import { HashRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import Main from './pages/Main';
import Photography from './pages/Photography';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import About from './pages/About';

import './styles/App.css';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/:type/:value" element={<Blog />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
