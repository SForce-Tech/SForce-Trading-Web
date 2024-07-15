import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Credential } from "../../types/Credential";

interface ManageCredentialDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (credential: Credential) => void;
  credential: Credential | null;
}

const ManageCredentialDialog: React.FC<ManageCredentialDialogProps> = ({
  open,
  onClose,
  onSave,
  credential,
}) => {
  const [consumerKey, setConsumerKey] = useState("");
  const [consumerSecret, setConsumerSecret] = useState("");
  const [isSandbox, setIsSandbox] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [userId, setUserId] = useState<number | null>(null); // Added userId state

  useEffect(() => {
    if (credential) {
      setConsumerKey(credential.consumerKey || "");
      setConsumerSecret(credential.consumerSecret || "");
      setIsSandbox(credential.isSandbox || false);
      setIsActive(credential.isActive || false);
      setUserId(credential.userId); // Set userId from credential
    } else {
      setConsumerKey("");
      setConsumerSecret("");
      setIsSandbox(false);
      setIsActive(false);
      setUserId(null); // Reset userId when adding a new credential
    }
  }, [credential]);

  const handleSave = () => {
    if (userId !== null) {
      // Ensure userId is not null before saving
      onSave({ consumerKey, consumerSecret, isSandbox, isActive, userId });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {credential ? "Edit Credential" : "Add Credential"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Consumer Key"
          value={consumerKey}
          onChange={(e) => setConsumerKey(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Consumer Secret"
          value={consumerSecret}
          onChange={(e) => setConsumerSecret(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isSandbox}
              onChange={(e) => setIsSandbox(e.target.checked)}
            />
          }
          label="Sandbox"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          }
          label="Active"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageCredentialDialog;
