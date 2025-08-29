// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Testdashboard = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            setLoading(true);
            setError('');
            
            const token = sessionStorage.getItem('token');
            if (!token) {
                navigate('/testuser');
                return;
            }

            const response = await fetch('http://127.0.0.1:5000/weather', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.status === 401) {
                sessionStorage.removeItem('token');
                navigate('/testuser');
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            
            const data = await response.json();
            
            // Check if data is an array and remove duplicates
            if (Array.isArray(data)) {
                // Remove duplicates by city id
                const uniqueData = data.filter((city, index, self) => 
                    index === self.findIndex((c) => c.id === city.id)
                );
                setWeatherData(uniqueData);
            } else {
                // If it's a single object, wrap it in an array
                setWeatherData([data]);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/testuser');
    };

    const getWeatherIcon = (iconCode) => {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Weather Dashboard</h1>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </header>

            {error && (
                <div className="error-message">
                    ⚠️ {error}
                </div>
            )}

            {weatherData.length === 0 && !error && (
                <div className="no-data">
                    <p>No weather data available</p>
                </div>
            )}

            <div className="weather-grid">
                {weatherData.map((city) => (
                    <div key={city.id} className="weather-card">
                        <div className="card-header">
                            <h2>{city.name}, {city.sys?.country}</h2>
                        </div>
                        
                        <div className="weather-main">
                            <img 
                                src={getWeatherIcon(city.weather[0].icon)} 
                                alt={city.weather[0].description}
                                className="weather-icon"
                            />
                            <div className="temperature">
                                {Math.round(city.main.temp)}°C
                            </div>
                            <div className="weather-description">
                                {city.weather[0].description}
                            </div>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testdashboard;