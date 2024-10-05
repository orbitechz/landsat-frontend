// src/components/MainContent.js
import React from 'react';
import { Typography, Box, Toolbar } from '@mui/material';
import MapComponent from './MapComponent';

const MainContent = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <MapComponent/>
    </Box>
  );
};

export default MainContent;
