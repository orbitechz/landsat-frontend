import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  Box,
  Tooltip,
} from "@mui/material";
import logo from "../assets/logo.png";
import {
  PublicOutlined,
  BarChartOutlined,
  Menu,
  ChevronLeft,
  MapOutlined,
  Bookmark,
  AccountCircleRounded,
  Settings,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const drawerWidth = 260;

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const StyledDrawer = styled(Drawer)(({ theme }) => ({
    ".MuiDrawer-paper": {
      background: "linear-gradient(145deg, #1e3c72, #2a5298)",
      color: "#ffffff",
      borderRight: "1px solid rgba(255, 255, 255, 0.12)",
      width: open ? drawerWidth : theme.spacing(8),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: "hidden",
      boxSizing: "border-box",
      boxShadow: "5px 0 15px rgba(0,0,0,0.2)",
      [theme.breakpoints.down("sm")]: {
        width: open ? "70%" : theme.spacing(7),
      },
    },
  }));

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          sx={{ margin: 1, position: "fixed", zIndex: 1300 }}
        >
          <Menu />
        </IconButton>
      )}

      <StyledDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={handleDrawerToggle}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: open ? "space-between" : "center",
            padding: "8px 16px",
            color: "#ffffff",
            background: "#2a5298",
          }}
        >
          {open && (
            <img
              src={logo}
              alt="NASA"
              style={{
                width: "70%",
                height: "auto",
                transition: "transform 0.3s",
                transform: open ? "scale(1)" : "scale(0.8)",
              }}
            />
          )}

          <IconButton onClick={handleDrawerToggle} sx={{ color: "#ffffff" }}>
            {open ? <ChevronLeft /> : <Menu />}
          </IconButton>
        </Toolbar>
        <Divider />

        <List sx={{ paddingTop: 0 }}>
          {menuItems.map(({ text, icon, path }) => (
            <Tooltip key={text} title={open ? "" : text} placement="right">
              <ListItem button sx={menuItemStyle} onClick={() => navigate(path)}>
                <ListItemIcon sx={{ color: "#bbdefb" }}>{icon}</ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItem>
            </Tooltip>
          ))}
        </List>

        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            width: "100%",
            textAlign: "center",
            transition: "opacity 0.3s",
            opacity: open ? 1 : 0,
          }}
        >
          <Typography variant="caption" sx={{ color: "#90caf9" }}>
            🚀 Explore the Cosmos!
          </Typography>
        </Box>
      </StyledDrawer>
    </>
  );
};

const menuItems = [
  { text: "Map View", icon: <MapOutlined />, path: "/map" },
  { text: "Favorites", icon: <Bookmark />, path: "/favorites" },
  { text: "Account", icon: <AccountCircleRounded />, path: "/account" },
  { text: "Settings", icon: <Settings />, path: "/settings" },
];

const menuItemStyle = {
  padding: "10px 24px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
  "& .MuiListItemText-root": {
    fontWeight: 500,
    fontSize: "1rem",
  },
  transition: "padding 0.2s",
};

export default Sidebar;
