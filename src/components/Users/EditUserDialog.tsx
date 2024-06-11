// src/components/Users/EditUserDialog.tsx
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { User } from "../../types/User";

interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  user: User;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  validationErrors: { [key: string]: string };
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  open,
  onClose,
  user,
  onChange,
  onSubmit,
  validationErrors,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          name="firstName"
          value={user.firstName}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          margin="normal"
          fullWidth
          required
          error={!!validationErrors.username}
          helperText={validationErrors.username}
        />
        <TextField
          label="Phone"
          name="phone"
          value={user.phone}
          onChange={onChange}
          margin="normal"
          fullWidth
          error={!!validationErrors.phone}
          helperText={validationErrors.phone}
        />
        <TextField
          label="Address Line 1"
          name="addressLine1"
          value={user.addressLine1}
          onChange={onChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Address Line 2"
          name="addressLine2"
          value={user.addressLine2}
          onChange={onChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="City"
          name="city"
          value={user.city}
          onChange={onChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="State"
          name="state"
          value={user.state}
          onChange={onChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Zip Code"
          name="zipCode"
          value={user.zipCode}
          onChange={onChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Country"
          name="country"
          value={user.country}
          onChange={onChange}
          margin="normal"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
