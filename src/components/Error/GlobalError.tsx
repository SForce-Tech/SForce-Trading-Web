import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useError } from "../../context/ErrorContext";

const GlobalError: React.FC = () => {
  const { error, setError } = useError();

  const handleClose = () => {
    setError(null);
  };

  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
};

export default GlobalError;
