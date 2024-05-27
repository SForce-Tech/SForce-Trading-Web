import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../api';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          throw new Error('API response is not an array');
        }
      } catch (err) {
        setError('Error fetching users');
        if (err instanceof Error) {
          console.error('Error fetching users:', err.message);
        } else {
          console.error('Unexpected error', err);
        }
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
