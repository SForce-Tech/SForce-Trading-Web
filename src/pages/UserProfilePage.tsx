import React, { useState, useContext, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Grid,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import EditUserDialog from "../components/Users/EditUserDialog";
import GlobalError from "../components/Error/GlobalError";
import useApi from "../hooks/useApi";
import { jwtDecode } from "jwt-decode";
import { updateUser, updatePassword } from "../api";
import { User } from "../types/User";
import axios from "axios";

const UserProfilePage: React.FC = () => {
  const { authData } = useContext(AuthContext);
  const [user, setUser] = useState<User | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "error"
  );
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const userApiConfig = useMemo(() => {
    if (authData) {
      const decodedToken: any = jwtDecode(authData);
      const username = decodedToken.sub;
      return {
        method: "GET",
        url: `/users/getUser?username=${username}`,
      };
    }
    return { method: "GET", url: "/placeholder" };
  }, [authData]);

  const {
    data: userData,
    error: userError,
    loading: userLoading,
    fetchData: fetchUserData,
  } = useApi<User>(userApiConfig);

  useEffect(() => {
    if (authData) {
      fetchUserData();
    }
  }, [authData, fetchUserData]);

  useEffect(() => {
    if (userData && userApiConfig.url !== "/dummy") {
      setUser(userData);
    }
  }, [userData, userApiConfig]);

  useEffect(() => {
    if (userError) {
      setGlobalError("Failed to fetch user data");
      console.error("Fetch user data error:", userError);
    }
  }, [userError]);

  const validateFields = (user: User): boolean => {
    const errors: { [key: string]: string } = {};

    // Validate email
    if (!user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Invalid email format";
    }

    // Validate phone number (simple example, you might need a more complex validation)
    if (user.phone && !user.phone.match(/^\d{10}$/)) {
      errors.phone = "Phone number should be 10 digits";
    }

    // Validate required fields
    if (!user.firstName) {
      errors.firstName = "First name is required";
    }
    if (!user.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!user.username) {
      errors.username = "Username is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditSubmit = async () => {
    if (!user) return;

    // Validate fields before submitting
    if (!validateFields(user)) {
      return;
    }

    try {
      await updateUser(user);
      fetchUserData();
      setOpenEditDialog(false);
      setSnackbarMessage("User updated successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage("Failed to update user");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Update user error:", err);
    }
  };

  const handlePasswordUpdate = async () => {
    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      if (user && user.id !== undefined) {
        await updatePassword(user.id, currentPassword, password);
        setOpenPasswordDialog(false);
        setSnackbarMessage("Password updated successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (err) {
      let errorMessage = "Failed to update password";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Update password error:", err);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (userLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      {user && (
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Avatar
                  alt={user.firstName}
                  src={`/avatars/${user.username}.jpg`}
                  sx={{ width: 100, height: 100 }}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography variant="h6">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography color="textSecondary">{user.email}</Typography>
                <Typography variant="body1">
                  <strong>Username:</strong> {user.username}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong> {user.phone}
                </Typography>
                <Typography variant="body1">
                  <strong>Address:</strong> {user.addressLine1}{" "}
                  {user.addressLine2}, {user.city}, {user.state} {user.zipCode},{" "}
                  {user.country}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenEditDialog(true)}
            >
              Edit Profile
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenPasswordDialog(true)}
            >
              Change Password
            </Button>
          </CardActions>
        </Card>
      )}

      {/* Edit User Dialog */}
      {user && (
        <EditUserDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          user={user}
          onChange={(e) =>
            setUser({
              ...user,
              [e.target.name]: e.target.value,
            })
          }
          onSubmit={handleEditSubmit}
          validationErrors={validationErrors}
        />
      )}

      {/* Change Password Dialog */}
      <Dialog
        open={openPasswordDialog}
        onClose={() => setOpenPasswordDialog(false)}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenPasswordDialog(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handlePasswordUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <GlobalError error={globalError} onClose={() => setGlobalError(null)} />
    </Container>
  );
};

export default UserProfilePage;
