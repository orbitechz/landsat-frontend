// src/components/Navbar.js
import React from 'react';
import { AppBar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Landsat Observation App
        </Typography>
        <Button color="inherit">Login</Button>
    </AppBar>
  );
};

export default Navbar;
