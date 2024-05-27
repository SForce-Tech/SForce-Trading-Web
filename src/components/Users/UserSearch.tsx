import React, { useState } from 'react';
import { findUserByEmail } from '../../api';

const UserSearch: React.FC = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState<any | null>(null);

  const handleSearch = async () => {
    try {
      const data = await findUserByEmail(email);
      setUser(data);
    } catch (err) {
      console.error('Error finding user:', err);
    }
  };

  return (
    <div>
      <h2>Search User by Email</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <button onClick={handleSearch}>Search</button>
      {user && (
        <div>
          <p>{user.username} - {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
