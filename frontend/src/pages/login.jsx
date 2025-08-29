// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Get token from sessionStorage on component mount
    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form refresh
        handleLogin(); // Call login function
    };

    const handleLogin = () => {
        setLoading(true);
        
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

        fetch('http://127.0.0.1:5000/token', options)
            .then(resp => {
                if (resp.status === 200) return resp.json();
                else throw new Error("Invalid Username or Password");
            })
            .then(data => {
                // Handle successful login data here
                console.log("Token", data);
                if (data && data.access_token) {
                    sessionStorage.setItem("token", data.access_token);
                    setToken(data.access_token);
                    // Redirect after successful login
                    navigate("/");
                }
            })
            .catch(error => {
                console.log("There was an error", error);
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
                
                {token && token !== "" && token !== undefined ? (
                    <div className="logged-in-state">
                       <button onClick={handleLogout} className="logout-button">
                            Logout
                       </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-container">
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
                        </div>

                        <div className="form-options">
                            <label className="checkbox-container">
                                <input type="checkbox" disabled={loading} />
                                <span className="checkmark"></span>
                                Remember me
                            </label>
                            <a href="#forgot" className="forgot-password">
                                Forgot password?
                            </a>
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

                <div className="login-footer">
                    <p>Don't have an account? <a href="register">SignUp</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;