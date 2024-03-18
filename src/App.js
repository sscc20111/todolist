import React from 'react';
import Transition from './transition';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {

  return (
    <div className="App">
        <Router>
          <Transition />
        </Router>
    </div>
  );
}

export default App;
