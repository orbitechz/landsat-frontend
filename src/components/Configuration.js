import React, { useState } from 'react';
import { Switch, FormControlLabel } from '@mui/material';

const Configuration = ({ hoverEnabled, setHoverEnabled }) => {
    return (
        <div>
            <FormControlLabel
                control={
                    <Switch
                        checked={hoverEnabled}
                        onChange={(event) => setHoverEnabled(event.target.checked)}
                    />
                }
                label="Enable Country Hover"
            />
        </div>
    );
};

export default Configuration;
