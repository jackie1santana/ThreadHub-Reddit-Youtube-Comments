import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {Home} from './components/Home'
import {Login} from './auth/Login'
import {Register} from './auth/Register'
import {Dashboard} from './components/Dashboard'
const isAdmin = true
  const App = () => (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Add context in */}
     {
         isAdmin &&  <Route path="/dashboard" element={<Dashboard />} />
     }
    </Routes>
  </Router>
  );

export default App;
