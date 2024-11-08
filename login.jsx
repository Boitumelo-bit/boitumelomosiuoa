import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login({ users, setLoggedInUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setErrorMessage('Please fill in both fields');
      return;
    }

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setLoggedInUser(user);
      setWelcomeMessage(`Welcome to Wings Cafe, ${user.username}!`);
      setErrorMessage('');

      // Clear fields after login
      setUsername('');
      setPassword('');

      // Optional: Delay navigation to let the user see the welcome message
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      setErrorMessage('Invalid username or password');
      setWelcomeMessage('');

      // Clear fields after failed login
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Welcome to Wings Cafe</h1>

      {welcomeMessage && <p className="welcome-message">{welcomeMessage}</p>}

      <form onSubmit={handleLogin} className="login-form">
        <fieldset>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input 
              id="username" 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
            />
          </div>
        </fieldset>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="login-btn">Login</button>


        <p className="register-link">
        Don't have an account?{' '}
        <span onClick={() => navigate('/register')} className="register-button">
          Register here
        </span>
      </p>
      </form>
  
    </div>
  );
}

export default Login;
