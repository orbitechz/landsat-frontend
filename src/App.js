import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import MapComponent from './components/MapComponent';  
import Configuration from './components/Configuration';
// import DataAnalysis from './components/DataAnalysis';  

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/map" element={<MapComponent />} />  
            <Route path="/config" element={<Configuration />} />
            {/* <Route path="/data-analysis" element={<DataAnalysis />} />   */}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
