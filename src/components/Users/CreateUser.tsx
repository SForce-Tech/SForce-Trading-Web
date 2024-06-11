// src/components/Users/CreateUser.tsx
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
import { createUser } from "../../api";
import { CreateUserDTO } from "../../types/User";
import GlobalError from "../Error/GlobalError";

const CreateUser: React.FC = () => {
  const [user, setUser] = useState<CreateUserDTO>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "error"
  );
  const [globalError, setGlobalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateFields = (user: CreateUserDTO): boolean => {
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
    if (!user.password) {
      errors.password = "Password is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate fields before submitting
    if (!validateFields(user)) {
      return;
    }

    try {
      await createUser(user);
      setSnackbarMessage("User created successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      // Clear form after successful creation
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      });
    } catch (error) {
      setSnackbarMessage("Failed to create user");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Create user error:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} mt={2}>
        <Typography variant="h6" gutterBottom>
          Create New User
        </Typography>
        <TextField
          label="First Name"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
          error={!!validationErrors.firstName}
          helperText={validationErrors.firstName}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
          error={!!validationErrors.lastName}
          helperText={validationErrors.lastName}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
          error={!!validationErrors.email}
          helperText={validationErrors.email}
        />
        <TextField
          label="Username"
          name="username"
          value={user.username}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
          error={!!validationErrors.username}
          helperText={validationErrors.username}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
          error={!!validationErrors.password}
          helperText={validationErrors.password}
        />
        <TextField
          label="Phone"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          margin="normal"
          fullWidth
          error={!!validationErrors.phone}
          helperText={validationErrors.phone}
        />
        <TextField
          label="Address Line 1"
          name="addressLine1"
          value={user.addressLine1}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Address Line 2"
          name="addressLine2"
          value={user.addressLine2}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="City"
          name="city"
          value={user.city}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="State"
          name="state"
          value={user.state}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Zip Code"
          name="zipCode"
          value={user.zipCode}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Country"
          name="country"
          value={user.country}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Create
        </Button>
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

export default CreateUser;
