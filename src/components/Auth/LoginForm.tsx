import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { fetchPublicKey } from "../../api";
import JSEncrypt from "jsencrypt";

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
  const { setAuthData } = useContext(AuthContext);
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
      const response = await axios.post(
        "https://localhost:8443/api/users/login",
        {
          username,
          password: encryptedPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      sessionStorage.setItem("token", response.data);
      setAuthData({ token: response.data });
      navigate("/home");
    } catch (err) {
      setError("Login failed. Please check your username and password.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
