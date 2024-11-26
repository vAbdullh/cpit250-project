import React from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Docs from './pages/Docs';
import Help from './pages/Help';
import Navbar from './pages/Navbar';
import Routing from './pages/Routing';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Router>
        {/* <p className='bg-green-500 text-white w-fit absolute right-0 top-0 px-3 py-1'>Beta</p> */}
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/help" element={<Help />} />
          {/* Updated route with dynamic start and end points */}
          <Route path="/route/:end" element={<Routing />} />
        </Routes>
        <Navbar />
        <div className='h-20 bg-transparent p-1 bg-primary order-12 z-[-5] relative'>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
