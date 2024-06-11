// src\pages\ManageUsersPage.tsx

import React, { useState } from "react";
import { Tabs, Tab, Container, Box } from "@mui/material";
import CreateUser from "../components/Users/CreateUser";
import UserList from "../components/Users/UserList";
import UserSearch from "../components/Users/UserSearch";
// import Permissions from "../components/Users/Permissions";

const ManageUsersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container>
      <Box sx={{ width: "100%", bgcolor: "background.paper", mt: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Search Users" />
          <Tab label="List Users" />
          <Tab label="Create User" />
          <Tab label="Permissions" />
        </Tabs>
      </Box>
      <Box sx={{ mt: 2 }}>
        {activeTab === 0 && <UserSearch />}
        {activeTab === 1 && <UserList />}
        {activeTab === 2 && <CreateUser />}
        {/* {activeTab === 3 && <Permissions />} */}
      </Box>
    </Container>
  );
};

export default ManageUsersPage;
