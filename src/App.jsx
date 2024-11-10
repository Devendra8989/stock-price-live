// src/App.jsx
import React from 'react';
import './App.css';
import NSEStockPrice from './component/NSEStockPrice';

function App() {
  return (
    <div className="App">
      <h1>Live NSE Stock Price</h1>
      <NSEStockPrice />
    </div>
  );
}

export default App;