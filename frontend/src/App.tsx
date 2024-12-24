import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomizerView from './components/CustomizerView';
import OrderForm from './components/OrderForm';
import './styles/App.css';

function App() {
  const [design, setDesign] = useState({});

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={
              <CustomizerView 
                design={design} 
                onDesignUpdate={setDesign} 
              />
            } 
          />
          <Route 
            path="/order" 
            element={
              <OrderForm 
                design={design}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
