import { Drawer, TextField, Toolbar, Typography } from "@mui/material"
import React, { useState } from "react"
import Button from '@mui/material/Button'

const SearchDrawer = ({ open, onClose, onSearch }) => {
    const [country, setCountry] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const handleSearch = () => {
        onSearch(country, startDate, endDate);
        onClose();
    };
    

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <div style={{ width: 300, padding: '16px' }}>
                <Typography variant="h6">Search Filters</Typography>
                <Toolbar/>
                <TextField
                    label="Country"
                    fullWidth
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
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
                <Button variant="contained" onClick={handleSearch} sx={{ mt: 2 }}>
                    Search
                </Button>
            </div>
        </Drawer>
    )
}

export default SearchDrawer
