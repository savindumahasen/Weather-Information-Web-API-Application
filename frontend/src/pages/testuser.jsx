import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './testuser.css';

const TestUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        handleLogin();
    };

    const handleLogin = () => {
        setLoading(true);
        setError('');

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        };

        fetch('http://127.0.0.1:5000/testusertoken', options)
            .then(async (resp) => {
                const text = await resp.text();
                
                try {
                    const data = text ? JSON.parse(text) : {};
                    
                    if (resp.ok) {
                        return data;
                    } else {
                        throw new Error(data.msg || "Invalid credentials");
                    }
                } catch (e) {
                    throw new Error(text || "Login failed");
                }
            })
            .then(data => {
                if (data && data.access_token) {
                    sessionStorage.setItem("token", data.access_token);
                    setToken(data.access_token);
                    navigate("/testuserdashboard");
                }
            })
            .catch(error => {
                console.error("Login error:", error);
                setError(error.message);
                alert(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        setToken('');
        setEmail('');
        setPassword('');

    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Sign in to access your account</p>
                </div>
                
                {token ? (
                    <div className="logged-in-state">
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="login-form">
                        {error && <div className="error-message">{error}</div>}
                        
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter you email"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                disabled={loading}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default TestUser;