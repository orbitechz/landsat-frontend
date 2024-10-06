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
} from "@mui/material";
import logo from "../assets/logo.png"; // Adjust the path based on your actual structure
import {
  PublicOutlined,
  BarChartOutlined,
  Menu,
  ChevronLeft,
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
      background: "linear-gradient(145deg, #0d47a1, #002171)",
      color: "#ffffff",
      borderRight: "1px solid #3d5afe",
      width: open ? drawerWidth : theme.spacing(8),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: "hidden",
      boxSizing: "border-box",
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
            background: "#1c54b2",
          }}
        >
          {open && (
            <img
              src={logo}
              alt="NASA"
              style={{ width: "80%", height: "auto" }}
            />
          )}

          <IconButton onClick={handleDrawerToggle} sx={{ color: "#ffffff" }}>
            {open ? <ChevronLeft /> : <Menu />}
          </IconButton>
        </Toolbar>
        <Divider />

        <List sx={{ paddingTop: 0 }}>
          <ListItem button sx={menuItemStyle} onClick={() => navigate("/map")}>
            <ListItemIcon sx={{ color: "#90caf9" }}>
              <PublicOutlined />
            </ListItemIcon>
            <ListItemText primary="Map View" sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>

          <ListItem
            button
            sx={menuItemStyle}
            onClick={() => navigate("/data-analysis")}
          >
            <ListItemIcon sx={{ color: "#90caf9" }}>
              <BarChartOutlined />
            </ListItemIcon>
            <ListItemText
              primary="Data Analysis"
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItem>
        </List>

        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#90caf9", opacity: open ? 1 : 0 }}
          >
            🚀 Explore the Cosmos!
          </Typography>
        </Box>
      </StyledDrawer>
    </>
  );
};

const menuItemStyle = {
  padding: "10px 20px",
  "&:hover": {
    backgroundColor: "#3949ab",
  },
  "& .MuiListItemText-root": {
    fontWeight: 500,
    fontSize: "0.95rem",
  },
};

export default Sidebar;
