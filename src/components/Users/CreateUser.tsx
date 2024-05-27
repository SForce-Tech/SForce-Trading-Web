import React, { useState } from 'react';
import { createUser } from '../../api';

const CreateUser: React.FC = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(user);
      alert('User created successfully');
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(user).map((key) => (
          <div key={key}>
            <label htmlFor={key}>{key}:</label>
            <input
              type="text"
              id={key}
              name={key}
              value={(user as any)[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
