import React, { lazy, Suspense, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import PrivateRoute from "./PrivateRoute";
import Header from "../components/Layout/Header";
import Drawer from "../components/Layout/Drawer";
import { AuthContext } from "../context/AuthContext";
import { Box, CssBaseline, Toolbar, CircularProgress } from "@mui/material";

const HomePage = lazy(() => import("../pages/HomePage"));
const SetupPage = lazy(() => import("../pages/SetupPage"));
const ManageUsersPage = lazy(() => import("../pages/ManageUsersPage"));
const UserProfilePage = lazy(() => import("../pages/UserProfilePage"));

const AppRoutes: React.FC = () => {
  const { authData } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Router>
      <CssBaseline />
      {authData && <Header open={drawerOpen} toggleDrawer={toggleDrawer} />}
      <Box sx={{ display: "flex" }}>
        {authData && <Drawer open={drawerOpen} toggleDrawer={toggleDrawer} />}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar /> {/* This spacer keeps content below the AppBar */}
          <Suspense fallback={<CircularProgress />}>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="home" element={<HomePage />} />
                <Route path="setup" element={<SetupPage />} />
                <Route path="manage-users" element={<ManageUsersPage />} />
                <Route path="profile" element={<UserProfilePage />} />
              </Route>
            </Routes>
          </Suspense>
        </Box>
      </Box>
    </Router>
  );
};

export default AppRoutes;
