import React from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Docs from './pages/Docs';
import Help from './pages/Help';
import Navbar from './pages/Navbar';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/help" element={<Help />} />
        </Routes>
        <Navbar />
        <div className='h-20 bg-transparent p-1 bg-primary order-12 z-[-5] relative'>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
