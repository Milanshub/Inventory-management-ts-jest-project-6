import React from "react";
import { Typography, Box } from '@mui/material';

const Dashboard: React.FC = () => {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
        
        <Typography variant="body1">This is your inventory dashboard.</Typography>
      </Box>
    );
  };

export default Dashboard; 