import React from "react";
import { Box, Grid2 } from '@mui/material';

interface DashboardLayoutProps {
    children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({children}) => {
    return (
        <Box sx={{ width: '100%', p: 4 }}>
            <Grid2 container spacing={2}>
                {children}
            </Grid2>
        </Box>
    );
};

export default DashboardLayout; 
