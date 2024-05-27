import React from 'react';
import UserList from '../components/Users/UserList';
import UserSearch from '../components/Users/UserSearch';
import CreateUser from '../components/Users/CreateUser';

const ManageUsersPage: React.FC = () => {
  return (
    <div>
      <h1>Manage Users</h1>
      <UserList />
      <UserSearch />
      <CreateUser />
    </div>
  );
};

export default ManageUsersPage;

export {};
