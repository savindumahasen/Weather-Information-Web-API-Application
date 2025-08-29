// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Testdashboard from  './pages/testdashbord'
import TestUser from './pages/testuser';
function App() {
    return (
        <Router>
            <div className="App">
                {/* Define the routes*/}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/testuser" element={<TestUser/>}/>
                    <Route path="/testuserdashboard" element={<Testdashboard/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;