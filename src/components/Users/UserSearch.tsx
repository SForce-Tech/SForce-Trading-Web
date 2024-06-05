import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { findUserByEmail } from "../../api";

const UserSearch: React.FC = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await findUserByEmail(email);
      setUser(userData);
      setError(null);
    } catch (err) {
      setError("User not found");
      setUser(null);
      console.error("Search user error:", err);
    }
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
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
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
    </Container>
  );
};

export default UserSearch;
