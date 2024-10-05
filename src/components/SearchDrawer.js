import {
    Drawer,
    TextField,
    Toolbar,
    Typography,
    Switch,
    FormControlLabel,
  } from "@mui/material";
  import React, { useState } from "react";
  import Button from "@mui/material/Button";
  import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
  import StarRoundedIcon from "@mui/icons-material/StarRounded";
  
  const SearchDrawer = ({ open, onClose, onSearch }) => {
    const [country, setCountry] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showSatellite, setShowSatellite] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
  
    const handleSearch = () => {
      onSearch(country, startDate, endDate, showSatellite, isFavorite);
      onClose();
    };
  
    const toggleFavorite = () => {
      setIsFavorite(!isFavorite);
    };
  
    return (
      <Drawer anchor="right" open={open} onClose={onClose}>
        <div style={{ width: 300, padding: "16px" }}>
          <Typography variant="h6">Search Filters</Typography>
          <Toolbar />
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Country"
              fullWidth
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <Button
              onClick={toggleFavorite}
              sx={{
                ml: 1,
                minWidth: "40px",
                padding: "15px",
                backgroundColor: "#1976d2",
                color: "inherit",
                "&:hover": { backgroundColor: "#115293" },
              }}
            >
              {isFavorite ? (
                <StarRoundedIcon style={{ color: "white" }} />
              ) : (
                <StarBorderRoundedIcon style={{ color: "white" }} />
              )}
            </Button>
          </div>
          <TextField
            label="Start Date"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="End Date"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ mt: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={showSatellite}
                onChange={(e) => setShowSatellite(e.target.checked)}
              />
            }
            label="Show Satellite Notifications"
            sx={{ mt: 2 }}
          />
          <Button variant="contained" onClick={handleSearch} sx={{ mt: 2 }}>
            Search
          </Button>
        </div>
      </Drawer>
    );
  };
  
  export default SearchDrawer;
  