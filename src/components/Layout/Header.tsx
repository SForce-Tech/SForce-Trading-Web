// src/components/Layout/Header.tsx
import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";

interface HeaderProps {
  open: boolean;
  toggleDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ open, toggleDrawer }) => {
  const { authData, logout } = useContext(AuthContext);

  return (
    <AppBar position="absolute">
      <Toolbar>
        {!open && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon style={{ color: "white" }} />
          </IconButton>
        )}
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          GymBuddy
        </Typography>
        {authData && (
          <>
            <IconButton
              color="inherit"
              aria-label="home button"
              component={Link}
              to="/home"
            >
              <Home />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="profile button"
              component={Link}
              to="/profile"
            >
              <AccountCircleIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="setup button"
              component={Link}
              to="/setup"
            >
              <SettingsIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="logout button"
              onClick={logout}
            >
              <LogoutIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
