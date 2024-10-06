import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Rectangle,
  GeoJSON,
  Polyline,
  LayersControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Button, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import SearchDrawer from "./SearchDrawer";
import NotificationDrawer from "./NotificationDrawer";
import "./style/map.css";

// Custom Icon Configuration
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});


// Location Marker Component
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

const { BaseLayer } = LayersControl
// Custom Zoom Control Component
const CustomControls = () => {
  const map = useMap();
  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();

  return (
    <div style={{ position: "absolute", bottom: "50px", right: "10px", zIndex: 1000, display: "flex", alignItems: "center", gap: '5px' }}>
      <IconButton
        sx={{ backgroundColor: "white", "&:hover": { backgroundColor: "#f0f0f0" } }}
        onClick={zoomIn}
      >
        <AddIcon />
      </IconButton>
      <IconButton
        sx={{ backgroundColor: "white", "&:hover": { backgroundColor: "#f0f0f0" } }}
        onClick={zoomOut}
      >
        <RemoveIcon />
      </IconButton>
    </div>
  );
};

// Main Map Component
const MapComponent = () => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gridCorners, setGridCorners] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [satellitePath, setSatellitePath] = useState([
    [34.0522, -118.2437],
    [37.7749, -122.4194],
    [40.7128, -74.0060],
    [42.3601, -71.0589],
    [41.8781, -87.6298],
    [30.2672, -97.7431],
    [29.7604, -95.3698],
    [25.7617, -80.1918],
    [18.5204, 73.8567],
    [55.7558, 37.6173],
    [39.9042, 116.4074],
    [35.6895, 139.6917],
    [1.3521, 103.8198],
    [-33.4489, -70.6693],
    [-34.6037, -58.3816],
    [51.5074, -0.1278],
    [48.8566, 2.3522],
  ]);
  const [tileUrl, setTileUrl] = useState("");
  useEffect(() => {
    // Buscar a URL dos tiles do Google Earth Engine

  }, []);
  useEffect(() => {
    const fetchGeoJson = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson"
      );
      const data = await response.json();

      setGeoJsonData(data);
    };
    const fetchTileUrl = async () => {
      try {
        const response = await axios.get("http://localhost:8000/gee-data-coords?lat_min=-26.175159&lon_min=-55.843506&lat_max=-24.617057&lon_max=-53.360596");
        setTileUrl(response.data.tile_url);
        console.log(tileUrl)
      } catch (error) {
        console.error("Erro ao buscar a URL dos tiles:", error);
      }
    };

    fetchTileUrl();
    fetchGeoJson();
  }, []);

  const handleSearch = async (country) => {
    if (!country.trim()) {
      alert("Please enter a country");
      return;
    }

    setLoading(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${country}`;
      const response = await axios.get(url);

      if (response.data.length === 0) {
        alert("Country not found! Try another search.");
      } else {
        const loc = response.data[0];
        const lat = parseFloat(loc.lat);
        const lon = parseFloat(loc.lon);
        setMarkerPosition([lat, lon]);

        const pixelSize = 0.01;
        const corners = [];

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const topLeft = [lat + i * pixelSize, lon + j * pixelSize];
            const topRight = [lat + i * pixelSize, lon + (j + 1) * pixelSize];
            const bottomRight = [
              lat + (i + 1) * pixelSize,
              lon + (j + 1) * pixelSize,
            ];
            const bottomLeft = [lat + (i + 1) * pixelSize, lon + j * pixelSize];

            corners.push({ topLeft, topRight, bottomRight, bottomLeft });
          }
        }
        setGridCorners(corners);

        const searchLog = {
          date: new Date().toISOString(),
          search: country,
          coordinates: { lat, lon },
          grid: corners,
        };

        setSearchHistory((prevLogs) => [...prevLogs, searchLog]);
      }
    } catch (error) {
      console.error("Error fetching the country:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Toolbar for Search and Notification Buttons */}
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
        <Button
          variant="contained"
          onClick={() => setDrawerOpen(true)}
          sx={{
            borderRadius: "8px",
            backgroundColor: "#1976d2",
            color: "#fff",
            padding: "10px 16px",
            "&:hover": {
              backgroundColor: "#155a9e",
            },
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            marginRight: "10px",
          }}
        >
          <SearchIcon />
        </Button>
        <Button
          variant="contained"
          onClick={() => setNotificationDrawerOpen(true)}
          sx={{
            borderRadius: "8px",
            backgroundColor: "#d32f2f",
            color: "#fff",
            padding: "10px 16px",
            "&:hover": {
              backgroundColor: "#9a0007",
            },
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <NotificationsIcon />
        </Button>
      </Box>

      {/* Drawers for Search and Notifications */}
      <SearchDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onSearch={handleSearch} />
      <NotificationDrawer open={notificationDrawerOpen} onClose={() => setNotificationDrawerOpen(false)} />

      {/* Main Map */}
      <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {tileUrl && (
          <TileLayer
            url={tileUrl}
            attribution="Map data &copy; Google Earth Engine"
            // opacity={0.5}
          />
        )}
        <LocationMarker position={markerPosition} />
        {gridCorners.map((cornerSet, index) => (
          <Rectangle key={index} bounds={[cornerSet.topLeft, cornerSet.bottomRight]} pathOptions={{ color: "blue", weight: 1, fillOpacity: 0.3 }} />
        ))}
        {/* <Polyline positions={satellitePath} c olor="red" weight={1} /> */}
        {/* Custom Zoom Controls */}
        <CustomControls />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
