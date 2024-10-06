import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Rectangle,
  GeoJSON,
  Polyline, // Import Polyline
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import SearchDrawer from "./SearchDrawer";
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
  const [markerPosition, setMarkerPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gridCorners, setGridCorners] = useState([]);
  const [countryPopup, setCountryPopup] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  // Satellite path data (replace with your actual data)
  const [satellitePath, setSatellitePath] = useState([
    [34.0522, -118.2437], // Los Angeles
    [37.7749, -122.4194], // San Francisco
    [40.7128, -74.0060],  // New York
    [42.3601, -71.0589],  // Boston
    [41.8781, -87.6298],  // Chicago
    [30.2672, -97.7431],  // Austin
    [29.7604, -95.3698],  // Houston
    [25.7617, -80.1918],  // Miami
    [18.5204, 73.8567],   // Mumbai
    [55.7558, 37.6173],   // Moscow
    [39.9042, 116.4074],  // Beijing
    [35.6895, 139.6917],  // Tokyo
    [1.3521, 103.8198],   // Singapore
    [-33.4489, -70.6693], // Santiago
    [-34.6037, -58.3816], // Buenos Aires
    [51.5074, -0.1278],   // London
    [48.8566, 2.3522],    
  ]);

  useEffect(() => {
    const fetchGeoJson = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson"
      );
      const data = await response.json();
      setGeoJsonData(data);
    };
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

  const countryStyle = {
    color: "transparent",
    weight: 1,
    fillColor: "transparent",
    fillOpacity: 0.3,
  };

  const hoverStyle = {
    fillColor: "#74baff",
    fillOpacity: 0.7,
  };

  const onEachCountry = (country, layer) => {
    layer.setStyle(countryStyle);

    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle(hoverStyle);
        setCountryPopup({
          name: layer.feature.properties.name,
          latlng: e.latlng,
          bounds: layer.getBounds(),
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle(countryStyle);
        setCountryPopup(null);
      },
    });
  };

  const sendDataToBackend = async () => {
    if (searchHistory.length === 0) return;

    try {
      console.log(searchHistory);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
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
          }}
        >
          <SearchIcon />
        </Button>
      </Box>

      <SearchDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSearch={handleSearch}
      />

      <MapContainer
        center={[51.505, -0.09]}
        zoom={2}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <LocationMarker position={markerPosition} />
        {gridCorners.map((cornerSet, index) => (
          <Rectangle
            key={index}
            bounds={[cornerSet.topLeft, cornerSet.bottomRight]}
            pathOptions={{ color: "blue", weight: 1, fillOpacity: 0.3 }}
          />
        ))}
        {geoJsonData && (
          <GeoJSON data={geoJsonData} onEachFeature={onEachCountry} />
        )}
        {countryPopup && (
          <Popup
            position={countryPopup.latlng}
            closeButton={false}
            onClose={() => setCountryPopup(null)}
            className="custom-popup"
          >
            <div style={{ width: "300px", height: "250px" }}>
              <MapSnippet bounds={countryPopup.bounds} />
              <div style={{ marginTop: "10px" }}>
                <h3>{countryPopup.name}</h3>
                <p>Next landsat: 4 days</p>
                <p>Last landsat: 12 days </p>
              </div>
            </div>
          </Popup>
        )}

        {/* Add Polyline for satellite path */}
        <Polyline positions={satellitePath} color="red" weight={1} />
      </MapContainer>
    </div>
  );
};

const MapSnippet = ({ bounds }) => {
  const center = bounds.getCenter();
  return (
    <MapContainer
      center={center}
      zoom={0}
      noWrap={true}
      style={{ height: "150px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        noWrap={true}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <Marker position={center}>
        <Popup>
          Center of {bounds.getSouthWest()} - {bounds.getNorthEast()}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
