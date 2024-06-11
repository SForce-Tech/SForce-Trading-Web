// src/components/Users/UserSearch.tsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { findUserByEmail } from "../../api";
import { User } from "../../types/User";
import GlobalError from "../Error/GlobalError";

const UserSearch: React.FC = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "error"
  );
  const [globalError, setGlobalError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validate email
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setValidationError("Invalid email format");
      return;
    }

    try {
      const userData = await findUserByEmail(email);
      setUser(userData);
      setSnackbarMessage("User found");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setValidationError(null);
    } catch (err) {
      setUser(null);
      setSnackbarMessage("User not found");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Search user error:", err);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSearch} mt={2}>
        <Typography variant="h6" gutterBottom>
          Search User by Email
        </Typography>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          fullWidth
          required
          error={!!validationError}
          helperText={validationError}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Search
        </Button>
        {user && (
          <Box mt={2}>
            <Typography variant="body1">
              Name: {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">Username: {user.username}</Typography>
            <Typography variant="body1">Phone: {user.phone}</Typography>
            <Typography variant="body1">
              Address: {user.addressLine1} {user.addressLine2}, {user.city},{" "}
              {user.state} {user.zipCode}, {user.country}
            </Typography>
          </Box>
        )}
      </Box>
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

export default UserSearch;
