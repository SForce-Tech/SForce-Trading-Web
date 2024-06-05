import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { fetchPublicKey } from "../../api";
import JSEncrypt from "jsencrypt";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

// Function to encrypt the password using the public key
function encryptPassword(password: string, publicKeyPem: string) {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKeyPem);
  return encrypt.encrypt(password);
}

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getPublicKey = async () => {
      try {
        const key = await fetchPublicKey();
        setPublicKey(key);
      } catch (error) {
        setError("Error fetching public key");
        console.error("Error fetching public key:", error);
      }
    };
    getPublicKey();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!publicKey) {
        throw new Error("Public key not loaded");
      }
      const encryptedPassword = encryptPassword(password, publicKey);
      if (!encryptedPassword) {
        throw new Error("Password encryption failed");
      }
      await login(username, encryptedPassword);
      navigate("/home");
    } catch (err) {
      setError("Login failed. Please check your username and password.");
      console.error("Login error:", err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleLogin} mt={1}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
