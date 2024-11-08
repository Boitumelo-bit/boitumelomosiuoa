import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './register.css';

function Register({ users, setUsers }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // To handle error messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = (e) => {
    e.preventDefault();

    // Basic validation: Check if fields are filled
    if (username === '' || password === '') {
      setErrorMessage('Please fill in both fields');
      return;
    }

    // Check if username already exists
    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      setErrorMessage('Username already exists');
      return;
    }

    // Add the new user to the list
    const newUser = { username, password };
    setUsers([...users, newUser]);

    // Clear the input fields for privacy
    setUsername('');
    setPassword('');

    // Optionally, you can provide feedback before navigating
    alert('Registration successful!'); // Show success message

    // Navigate to the login page after successful registration
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h1 className="register-heading">Welcome to Wings Cafe</h1>
      <form onSubmit={handleRegister} className="register-form">
        <fieldset>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input 
              id="username" 
              type="text" 
              placeholder="Enter your username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
        </fieldset>

        {errorMessage && <p className="message">{errorMessage}</p>} {/* Error message */}

        <button type="submit" className="register-btn">Register</button>
      </form>
    </div>
  );
}

export default Register;
