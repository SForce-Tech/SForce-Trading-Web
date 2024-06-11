// src/components/GlobalError.tsx
import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface GlobalErrorProps {
  error: string | null;
  onClose: () => void;
}

const GlobalError: React.FC<GlobalErrorProps> = ({ error, onClose }) => {
  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
};

export default GlobalError;
