import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { getAllUsers, deleteUser, updateUser } from "../../api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "../../types/User";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "error"
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setSnackbarMessage("Failed to fetch users");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setLoading(false);
        console.error("Fetch users error:", err);
      }
    };
    fetchUsers();
  }, []);

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
    try {
      await updateUser(selectedUser);
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? selectedUser : user
      );
      setUsers(updatedUsers);
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
      const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
      setUsers(updatedUsers);
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

  if (error) {
    return (
      <Container>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Container>
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
            {users.map((user) => (
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

      {/* Edit Dialog */}
      {selectedUser && (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              label="First Name"
              name="firstName"
              value={selectedUser.firstName}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, firstName: e.target.value })
              }
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={selectedUser.lastName}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, lastName: e.target.value })
              }
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Username"
              name="username"
              value={selectedUser.username}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, username: e.target.value })
              }
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Phone"
              name="phone"
              value={selectedUser.phone}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, phone: e.target.value })
              }
              margin="normal"
              fullWidth
            />
            <TextField
              label="Address Line 1"
              name="addressLine1"
              value={selectedUser.addressLine1}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  addressLine1: e.target.value,
                })
              }
              margin="normal"
              fullWidth
            />
            <TextField
              label="Address Line 2"
              name="addressLine2"
              value={selectedUser.addressLine2}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  addressLine2: e.target.value,
                })
              }
              margin="normal"
              fullWidth
            />
            <TextField
              label="City"
              name="city"
              value={selectedUser.city}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, city: e.target.value })
              }
              margin="normal"
              fullWidth
            />
            <TextField
              label="State"
              name="state"
              value={selectedUser.state}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, state: e.target.value })
              }
              margin="normal"
              fullWidth
            />
            <TextField
              label="Zip Code"
              name="zipCode"
              value={selectedUser.zipCode}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, zipCode: e.target.value })
              }
              margin="normal"
              fullWidth
            />
            <TextField
              label="Country"
              name="country"
              value={selectedUser.country}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, country: e.target.value })
              }
              margin="normal"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Dialog */}
      {selectedUser && (
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete {selectedUser.firstName}{" "}
              {selectedUser.lastName}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDeleteDialog(false)}
              color="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
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
    </Container>
  );
};

export default UserList;
