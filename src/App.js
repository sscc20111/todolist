import React from 'react';
import Transition from './transition';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Transition />
        </BrowserRouter>
    </div>
  );
}

export default App;
