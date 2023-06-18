import React, { useEffect, useState } from 'react';
import './App.css';
import Cars from './Cars';
import Navbar from './Navbar';

const App = () => {

  return (
    <div>
      <Navbar />
      <Cars />
    </div>
  );
}

export default App;
