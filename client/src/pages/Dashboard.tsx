import React from "react";
import { Typography, Box, Grid, Card, CardContent } from '@mui/material';

const Dashboard: React.FC = () => {
    return (
        <Box sx={{ width: '100%', p: 4 }}>
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Typography variant="body1" gutterBottom>This is your inventory dashboard.</Typography>

            <Grid container spacing={4}>
                {/* Key Performance Indicators */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">Total Inventory Value</Typography>
                            <Typography variant="h6">$10,000</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">Items in Stock</Typography>
                            <Typography variant="h6">150</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">Low Stock Alerts</Typography>
                            <Typography variant="h6">5 Items</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Recent Activity */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">Recent Activity</Typography>
                            <Typography variant="body1">Last updated: 10/10/2024</Typography>
                            {/* You can list recent activities here */}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
