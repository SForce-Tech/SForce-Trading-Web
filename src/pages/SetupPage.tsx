import React from 'react';
import { useNavigate } from 'react-router-dom';

const SetupPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Setup</h2>
      <nav>
        <button onClick={() => navigate('/manage-users')}>Manage Users</button>
      </nav>
    </div>
  );
};

export default SetupPage;
