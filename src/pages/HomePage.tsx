import React, { useContext } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Home Page
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/setup")}
          >
            Setup
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={logout}
            sx={{ ml: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
