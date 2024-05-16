import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Bookmark from './pages/Bookmark/Bookmark';
import Navbar from './components/Navbar/Navbar';
import { Context } from './main';

function App() {
  const { isAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/");
  }

  return (
    <> {/* Wrap your entire component with Router */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookmark" element={<Bookmark />} />
      </Routes>
    </>
  );
}

export default App;
