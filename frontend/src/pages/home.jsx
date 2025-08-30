// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);


    const handleGetUser = () => {
        navigate('/signup');
    };
    const handleGetAdmin = ()=> {
        navigate('/testuser');

    };

    return (
        <div className="main-section">
            {/* First section */}
            <section className="first-section">
                <div className="first-content">
                    <h1 className="first-heading">
                        Welcome to <span className="brand">WeatherWatch</span>
                    </h1>
                    <p className="first-text">
                        Simple weather app that helps you plan your day. 
                        No complicated stuff, just the weather info you need.
                    </p>
                    <div className="button-group">
                        <button 
                            className="main-btn"
                            onClick={handleGetUser}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            User SignUp
                            {isHovered && <span className="arrow"> →</span>}
                        </button>
                         <button 
                            className="main-btn"
                            onClick={handleGetAdmin}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            Test User Signup
                            {isHovered && <span className="arrow"> →</span>}
                        </button>
                    </div>
                </div>
                 {/* Features section */}
                <div className="second-section">
                    <div className="weather-card">
                        <div className="card-header">
                            <span className="city">Colombo</span>
                            <span className="temp">22°C</span>
                        </div>
                        <div className="weather-icon">☀️</div>
                        <div className="weather-desc">Sunny</div>
                    </div>
                </div>
            </section>

            {/* Features section */}
            <section className="features-section">
                <h2 className="section-title">What You Get</h2>
                <div className="features-grid">
                   <div className="feature-box">
                     <div className="feature-icon">☀️</div>
                     <h3 className="feature-title">Real Time Weather</h3>
                     <p className="feature-text">Get  the live weather information</p>
                    </div>
                 
                </div>
            </section>
        </div>
    );
};

export default Home;