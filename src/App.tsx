import React, { useState, useEffect} from 'react';
import './App.css';
import Register from './Register'
import { Route, Routes } from 'react-router-dom';
import Tasks from './Tasks';

const App: React.FC = () => {

  return (
    <div className="App"> 
    <Routes>
        <Route path="/" element={<Tasks/>} />
        <Route path="/register" element={<Register/>} />
    </Routes>
    </div>   
  )
};

export default App;

// collection(db, "tasks").doc(db, "id")onSnapshot((snapshot) 