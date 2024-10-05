import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { TextField, Box, Button, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import "./style/map.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMarker = ({ position }) => {
  const map = useMap();
  if (position) {
    map.flyTo(position, 13, { animate: true });
  }
  return position ? (
    <Marker position={position}>
      <Popup>Location found!</Popup>
    </Marker>
  ) : null;
};

const MapComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gridCorners, setGridCorners] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a location");
      return;
    }

    setLoading(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`;
      const response = await axios.get(url);

      if (response.data.length === 0) {
        alert("Location not found! Try another search.");
      } else {
        const location = response.data[0];
        const lat = parseFloat(location.lat);
        const lon = parseFloat(location.lon);
        setMarkerPosition([lat, lon]);

        const pixelSize = 0.01;
        const corners = [];
        
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const topLeft = [lat + (i * pixelSize), lon + (j * pixelSize)];
            const topRight = [lat + (i * pixelSize), lon + ((j + 1) * pixelSize)];
            const bottomRight = [lat + ((i + 1) * pixelSize), lon + ((j + 1) * pixelSize)];
            const bottomLeft = [lat + ((i + 1) * pixelSize), lon + (j * pixelSize)];
            
            corners.push([topLeft, topRight, bottomRight, bottomLeft]);
            
            console.log(`Grid ${i + 1},${j + 1} Corners:`, { topLeft, topRight, bottomRight, bottomLeft });
          }
        }
        setGridCorners(corners);
      }
    } catch (error) {
      console.error("Error fetching the location:", error);
      alert("There was an error searching for the location.");
    }
    setLoading(false);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 2,
          mr: 2,
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1000,
          padding: "10px",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          label="Search Location"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            ml: 2,
            borderRadius: "8px",
            backgroundColor: "#1976d2",
            color: "#fff",
            padding: "10px 16px",
            "&:hover": {
              backgroundColor: "#155a9e",
            },
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <SearchIcon />
          )}
        </Button>
      </Box>

      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <LocationMarker position={markerPosition} />
        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>Target Pixel</Popup>
          </Marker>
        )}
        {gridCorners.map((cornerSet, index) => (
          <Rectangle
            key={index}
            bounds={cornerSet}
            pathOptions={{ color: "blue", weight: 1, fillOpacity: 0.3 }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
