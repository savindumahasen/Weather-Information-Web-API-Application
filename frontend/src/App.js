// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import Testdashboard from  './pages/testdashbord'
import TestUser from './pages/testuser';
import LoginVerification from './pages/loginverification';
function App() {
    return (
        <Router>
            <div className="App">
                {/* Define the routes*/}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/testuser" element={<TestUser/>}/>
                    <Route path="/testuserdashboard" element={<Testdashboard/>}/>
                    <Route path="/loginverification" element={<LoginVerification/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;