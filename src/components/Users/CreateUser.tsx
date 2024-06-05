import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { createUser } from "../../api";

const CreateUser: React.FC = () => {
  const [user, setUser] = useState({
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
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(user);
      setSuccess("User created successfully!");
      setError(null);
    } catch (err) {
      setError("Failed to create user");
      setSuccess(null);
      console.error("Create user error:", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} mt={2}>
        <Typography variant="h6" gutterBottom>
          Create User
        </Typography>
        <TextField
          label="First Name"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
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
        />
        <TextField
          label="Username"
          name="username"
          value={user.username}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
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
        />
        <TextField
          label="Phone"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          margin="normal"
          fullWidth
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
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="primary" variant="body2">
            {success}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Create User
        </Button>
      </Box>
    </Container>
  );
};

export default CreateUser;
