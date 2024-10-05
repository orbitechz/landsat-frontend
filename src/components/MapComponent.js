// src/components/MapComponent.js
import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { TextField, Box, Button } from '@mui/material'
import axios from 'axios'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const LocationMarker = ({ position }) => {
  const map = useMap()
  if (position) {
    map.flyTo(position, 13, { animate: true }) // Fly to the new position
  }
  return position ? (
    <Marker position={position}>
      <Popup>Location found!</Popup>
    </Marker>
  ) : null
}

const MapComponent = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [markerPosition, setMarkerPosition] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert('Please enter a location')
      return
    }

    setLoading(true) 
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`
      const response = await axios.get(url)
      
      if (response.data.length === 0) {
        alert('Location not found! Try another search.')
      } else {
        const location = response.data[0]
        const lat = parseFloat(location.lat)
        const lon = parseFloat(location.lon)
        setMarkerPosition([lat, lon])  // Update the marker position to the found coordinates
      }
    } catch (error) {
      console.error('Error fetching the location:', error)
      alert('There was an error searching for the location.')
    }
    setLoading(false)
  }

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
        <TextField
          label="Search Location"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ ml: 2 }}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </Box>

      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker position={markerPosition} />
      </MapContainer>
    </div>
  )
}

export default MapComponent
