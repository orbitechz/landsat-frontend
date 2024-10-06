import React, { useState } from 'react';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';

const MapFilter = () => {
  const [filter, setFilter] = useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="map-filter-select-label">Map Filter</InputLabel>
      <Select
        labelId="map-filter-select-label"
        id="map-filter-select"
        value={filter}
        label="Map Filter"
        onChange={handleChange}
        sx={{
          height: "45px",
          padding: "8px 12px",
          fontSize: "16px",
          '& .MuiSelect-select': {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          },
        }}
      >
        <MenuItem value="green" sx={{ padding: "10px", '&:hover': { backgroundColor: '#e0e0e0' } }}>True Color</MenuItem>
        <MenuItem value="infrared" sx={{ padding: "10px", '&:hover': { backgroundColor: '#e0e0e0' } }}>Thermal</MenuItem>
        <MenuItem value="random" sx={{ padding: "10px", '&:hover': { backgroundColor: '#e0e0e0' } }}>NVDI</MenuItem>
      </Select>
    </FormControl>
  );
};

export default MapFilter;
