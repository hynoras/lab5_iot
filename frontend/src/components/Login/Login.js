import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/user/login', { username, password });
      const { token } = response.data;

      // Store token in cookies
      document.cookie = `token=${token}; path=/; secure; samesite=strict`;

      // Handle successful login, e.g., redirecting to another page
      onClose();
      console.log('Logged in successfully:', response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modalHeader">
          <button className="btnLoginClose" onClick={onClose}>
            X
          </button>
          <h2 className="txtLogin">Login</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
