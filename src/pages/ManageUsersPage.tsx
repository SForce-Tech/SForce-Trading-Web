import React, { useState } from "react";
import { Container, Typography, Tabs, Tab, Box } from "@mui/material";
import CreateUser from "../components/Users/CreateUser";
import UserList from "../components/Users/UserList";
import UserSearch from "../components/Users/UserSearch";
// import Permissions from '../components/Users/Permissions';

const ManageUsersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newIndex: number) => {
    setActiveTab(newIndex);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Manage Users
      </Typography>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="List Users" />
        <Tab label="Search Users" />
        <Tab label="Create User" />
        <Tab label="Permissions" />
      </Tabs>
      <Box mt={3}>
        {activeTab === 0 && <UserList />}
        {activeTab === 1 && <UserSearch />}
        {activeTab === 2 && <CreateUser />}
        {/* {activeTab === 3 && <Permissions />} */}
      </Box>
    </Container>
  );
};

export default ManageUsersPage;
