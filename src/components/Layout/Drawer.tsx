import React, { useState, useEffect } from "react";
import {
  Drawer as MUIDrawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  ListSubheader,
  styled,
  CircularProgress,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useError } from "../../context/ErrorContext";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface DrawerProps {
  open: boolean;
  toggleDrawer: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ open, toggleDrawer }) => {
  const location = useLocation();
  const { setError } = useError();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate fetching data
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setError]);

  return (
    <>
      <MUIDrawer variant="persistent" anchor="left" open={open}>
        <DrawerHeader>
          <IconButton onClick={toggleDrawer} aria-label="close drawer">
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <List>
              <ListItemButton
                component={Link}
                to="/home"
                selected={location.pathname === "/home"}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/orders"
                selected={location.pathname === "/orders"}
              >
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/customers"
                selected={location.pathname === "/customers"}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/reports"
                selected={location.pathname === "/reports"}
              >
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/integrations"
                selected={location.pathname === "/integrations"}
              >
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Integrations" />
              </ListItemButton>
            </List>
            <Divider />
            <ListSubheader inset>Saved reports</ListSubheader>
            <List>
              <ListItemButton
                component={Link}
                to="/current-month"
                selected={location.pathname === "/current-month"}
              >
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Current month" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/last-quarter"
                selected={location.pathname === "/last-quarter"}
              >
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Last quarter" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/year-end-sale"
                selected={location.pathname === "/year-end-sale"}
              >
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Year-end sale" />
              </ListItemButton>
            </List>
          </>
        )}
      </MUIDrawer>
      <Main open={open}>
        <DrawerHeader />
        {/* Add your main content here */}
      </Main>
    </>
  );
};

export default Drawer;
