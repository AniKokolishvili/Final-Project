import React, { useEffect, useState } from 'react';
import './App.css';
import Car from './Cars';
import Navbar from './Navbar';

const App = () => {

  return (
    <div>
      <Navbar />
      <Car />
    </div>
  );
}

export default App;
