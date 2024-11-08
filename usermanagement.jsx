import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [addUsername, setAddUsername] = useState('');
  const [addPassword, setAddPassword] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addRole] = useState('user'); // Only "user" role
  const [updateUsername, setUpdateUsername] = useState('');
  const [updatePassword, setUpdatePassword] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [deleteUsername, setDeleteUsername] = useState('');
  const [warningVisible, setWarningVisible] = useState(false);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
    if (storedUsers.length === 1 && storedUsers[0].username === 'defaultUser') {
      setWarningVisible(true);
    }
  }, []);

  const saveUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
  };

  const addUser = (event) => {
    event.preventDefault();
    // Check if the username or email already exists
    if (users.find(user => user.username === addUsername)) {
      alert('Username already exists!');
      return;
    }
    if (users.find(user => user.email === addEmail)) {
      alert('Email already in use!');
      return;
    }

    const newUser = {
      id: users.length ? Math.max(users.map(user => user.id)) + 1 : 1,
      username: addUsername,
      password: addPassword,
      email: addEmail,
      role: addRole,
    };
    saveUsers([...users, newUser]);
    alert('User added successfully!');
    setWarningVisible(false);
    setAddUsername('');
    setAddPassword('');
    setAddEmail('');
  };

  const updateUser = (event) => {
    event.preventDefault();
    const userIndex = users.findIndex(user => user.username === updateUsername);
    if (userIndex !== -1) {
      const updatedUser = {
        ...users[userIndex],
        password: updatePassword || users[userIndex].password,
        email: updateEmail || users[userIndex].email,
      };
      const newUsers = [...users];
      newUsers[userIndex] = updatedUser;
      saveUsers(newUsers);
      alert('User updated successfully!');
      setUpdateUsername('');
      setUpdatePassword('');
      setUpdateEmail('');
    } else {
      alert('User not found');
    }
  };

  const deleteUser = (event) => {
    event.preventDefault();
    const newUsers = users.filter(user => user.username !== deleteUsername);
    saveUsers(newUsers);
    alert('User deleted successfully!');
    setDeleteUsername('');
  };

  return (
    <div>
      {warningVisible && (
        <p className="warningMessage">You must add yourself as a new user before you can log in. Please use the 'Add New User' form to create your account.</p>
      )}

      <fieldset>
        <legend>Add New User</legend>
        <form onSubmit={addUser}>
          <input type="text" value={addUsername} onChange={(e) => setAddUsername(e.target.value)} placeholder="Username" required />
          <input type="password" value={addPassword} onChange={(e) => setAddPassword(e.target.value)} placeholder="Password" required />
          <input type="email" value={addEmail} onChange={(e) => setAddEmail(e.target.value)} placeholder="Email" required />
          <button type="submit">Add User</button>
        </form>
      </fieldset>

      <fieldset>
        <legend>Update User</legend>
        <form onSubmit={updateUser}>
          <input type="text" value={updateUsername} onChange={(e) => setUpdateUsername(e.target.value)} placeholder="Username" required />
          <input type="password" value={updatePassword} onChange={(e) => setUpdatePassword(e.target.value)} placeholder="New Password" />
          <input type="email" value={updateEmail} onChange={(e) => setUpdateEmail(e.target.value)} placeholder="New Email" />
          <button type="submit">Update User</button>
        </form>
      </fieldset>

      <fieldset>
        <legend>Delete User</legend>
        <form onSubmit={deleteUser}>
          <input type="text" value={deleteUsername} onChange={(e) => setDeleteUsername(e.target.value)} placeholder="Username" required />
          <button type="submit">Delete User</button>
        </form>
      </fieldset>

      <fieldset>
        <legend>Users Table</legend>
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </fieldset>
    </div>
  );
};

export default UserManagement;
