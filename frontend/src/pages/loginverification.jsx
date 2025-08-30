
// src/components/LoginVerification.jsx
import React, { useState } from 'react';
import './loginverification.css';

const LoginVerification = () => {
    const [mfaCode, setMfaCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerification = (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate verification process
        setTimeout(() => {
            setLoading(false);
            alert('Verification would happen here');
        }, 1000);
    };

    const handleResendCode = () => {
        alert('New code would be sent here');
    };

    return (
        <div className="verification-container">
            <div className="verification-card">
                <div className="verification-header">
                    <h2>Verify Your Identity</h2>
                    <p>Enter the 6-digit code sent to your email</p>
                </div>

                <form onSubmit={handleVerification} className="verification-form">
                    <div className="form-group">
                        <label htmlFor="mfaCode">Verification Code</label>
                        <input
                            type="text"
                            id="mfaCode"
                            value={mfaCode}
                            onChange={(e) => setMfaCode(e.target.value)}
                            placeholder="Enter 6-digit code"
                            disabled={loading}
                            maxLength="6"
                            className="mfa-input"
                        />
                        <p className="input-help">Check your email for the verification code</p>
                    </div>

                    <button 
                        type="submit" 
                        className="verify-button"
                        disabled={loading || mfaCode.length !== 6}
                    >
                        {loading ? 'Verifying...' : 'Verify Code'}
                    </button>

                    <div className="verification-footer">
                        <p>Didn't receive the code?</p>
                        <button 
                            type="button" 
                            onClick={handleResendCode}
                            disabled={loading}
                            className="resend-button"
                        >
                            Resend Code
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginVerification;