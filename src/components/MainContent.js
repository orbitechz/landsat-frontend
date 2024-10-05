// src/components/MainContent.js
import React from 'react';
import { Typography, Box, Toolbar } from '@mui/material';

const MainContent = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar /> {/* Add an empty Toolbar to create spacing */}
    </Box>
  );
};

export default MainContent;
