import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import HomePage from "../pages/HomePage";
import SetupPage from "../pages/SetupPage";
import ManageUsersPage from "../pages/ManageUsersPage";
import PrivateRoute from "./PrivateRoute";
import Header from "../components/Layout/Header";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="home" element={<HomePage />} />
          <Route path="setup" element={<SetupPage />} />
          <Route path="manage-users" element={<ManageUsersPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
