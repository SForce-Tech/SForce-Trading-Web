import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ManageUsersPage from '../pages/ManageUsersPage';
import Header from '../components/Layout/Header';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/manage-users" element={<ManageUsersPage />} />
        <Route path="/logout" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

export {};
