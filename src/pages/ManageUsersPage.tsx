import React, { useState } from 'react';
import CreateUser from '../components/Users/CreateUser';
import UserList from '../components/Users/UserList';
import UserSearch from '../components/Users/UserSearch';
// import Permissions from '../components/Users/Permissions';

const ManageUsersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'list' | 'create' | 'permissions'>('list');

  return (
    <div>
      <h2>Manage Users</h2>
      <nav>
        <button onClick={() => setActiveTab('search')}>Search Users</button>
        <button onClick={() => setActiveTab('list')}>List Users</button>
        <button onClick={() => setActiveTab('create')}>Create Users</button>
        <button onClick={() => setActiveTab('permissions')}>Permissions</button>
      </nav>
      <div>
        {activeTab === 'search' && <UserSearch />}
        {activeTab === 'list' && <UserList />}
        {activeTab === 'create' && <CreateUser />}
        {/* {activeTab === 'permissions' && <Permissions />} */}
      </div>
    </div>
  );
};

export default ManageUsersPage;
