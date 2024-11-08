import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Register from './register';
import Login from './login';
import InventoryDashboard from './dashboard';
import InventoryManagement from './stockmanagement';
import UserManagement from './usermanagement';
import LogoutForm from './logout';
import './App.css';


function Layout({ children }) {
  const location = useLocation();
  
  // Hide nav for login and register pages
  const hideNav = location.pathname === '/' || location.pathname === '/login';
  
  return (
    <>
      {!hideNav && (
        <nav>
          <div className="logo">Wings Cafe</div>
          <ul>
            <li>
              <Link to="/inventory">Inventory Management</Link>
            </li>
            <li>
              <Link to="/usermanagement">User Management</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
      )}
      <div>{children}</div>
    </>
  );
}









function App() {
  const [users, setUsers] = useState([]);  
  const [loggedInUser, setLoggedInUser] = useState(null);  

  const handleLogout = () => {
    setLoggedInUser(null); // Clear the logged-in user state
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login users={users} setLoggedInUser={setLoggedInUser} />} />
          <Route path="/login" element={<Login users={users} setLoggedInUser={setLoggedInUser} />} />
          <Route path="/register" element={<Register users={users} setUsers={setUsers} />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={loggedInUser ? <InventoryDashboard users={users} setLoggedInUser={setLoggedInUser} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/inventory" 
            element={loggedInUser ? <InventoryManagement /> : <Navigate to="/" />} 
          />
          <Route 
            path="/usermanagement" 
            element={loggedInUser ? <UserManagement /> : <Navigate to="/" />} 
          />
          <Route 
            path="/logout" 
            element={
              <LogoutForm onLogout={handleLogout} isLoggedIn={!!loggedInUser} />
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
