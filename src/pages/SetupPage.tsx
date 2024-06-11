// src\pages\SetupPage.tsx

import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SetupPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Setup
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/manage-users")}
          >
            Manage Users
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SetupPage;
