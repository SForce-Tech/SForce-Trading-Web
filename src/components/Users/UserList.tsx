// src/components/Users/UserList.tsx
import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "../../types/User";
import useApi from "../../hooks/useApi";
import GlobalError from "../Error/GlobalError";
import { updateUser, deleteUser } from "../../api"; // Directly import these functions
import EditUserDialog from "./EditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";

const UserList: React.FC = () => {
  const apiConfig = useMemo(
    () => ({
      method: "GET",
      url: "/users/listAll",
    }),
    []
  );

  const { data: users, error, loading, fetchData } = useApi<User[]>(apiConfig);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "error"
  );
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (error) {
      setGlobalError(error);
    }
  }, [error]);

  const validateFields = (user: User): boolean => {
    const errors: { [key: string]: string } = {};

    // Validate email
    if (!user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Invalid email format";
    }

    // Validate phone number (simple example, you might need a more complex validation)
    if (user.phone && !user.phone.match(/^\d{10}$/)) {
      errors.phone = "Phone number should be 10 digits";
    }

    // Validate required fields
    if (!user.firstName) {
      errors.firstName = "First name is required";
    }
    if (!user.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!user.username) {
      errors.username = "Username is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleEditSubmit = async () => {
    if (!selectedUser) return;

    // Validate fields before submitting
    if (!validateFields(selectedUser)) {
      return;
    }

    try {
      await updateUser(selectedUser);
      fetchData();
      setOpenEditDialog(false);
      setSnackbarMessage("User updated successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage("Failed to update user");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Update user error:", err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser || selectedUser.id === undefined) return;
    try {
      await deleteUser(selectedUser.id);
      fetchData();
      setOpenDeleteDialog(false);
      setSnackbarMessage("User deleted successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage("Failed to delete user");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Delete user error:", err);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        List of Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{`${user.addressLine1} ${user.addressLine2}, ${user.city}, ${user.state} ${user.zipCode}, ${user.country}`}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit User Dialog */}
      {selectedUser && (
        <EditUserDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          user={selectedUser}
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              [e.target.name]: e.target.value,
            })
          }
          onSubmit={handleEditSubmit}
          validationErrors={validationErrors}
        />
      )}

      {/* Delete User Dialog */}
      {selectedUser && (
        <DeleteUserDialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          user={selectedUser}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <GlobalError error={globalError} onClose={() => setGlobalError(null)} />
    </Container>
  );
};

export default UserList;
