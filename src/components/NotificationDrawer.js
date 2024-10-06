import React from "react";
import {
  Drawer,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

const NotificationDrawer = ({ open, onClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 300, padding: "16px" }}>
        <Typography variant="h6">Satellite Alerts</Typography>
        
        {/* Static Alert Cards */}
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              Alert 1
            </Typography>
            <Typography variant="body2">
              A satellite is passing over the specified location on Oct 12, 2024 at 14:30 UTC.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              View Details
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              Alert 2
            </Typography>
            <Typography variant="body2">
              A satellite will be visible on Oct 15, 2024 at 03:00 UTC.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              View Details
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              Alert 3
            </Typography>
            <Typography variant="body2">
              Low Earth Orbit satellite approaching on Oct 20, 2024 at 10:45 UTC.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              View Details
            </Button>
          </CardActions>
        </Card>
      </div>
    </Drawer>
  );
};

export default NotificationDrawer;
