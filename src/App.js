import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />

        {/* Main Content with Routes */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<MainContent />} />
            {/* Define other routes here as needed */}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
