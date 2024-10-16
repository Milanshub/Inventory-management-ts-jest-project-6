import React, { useContext, useEffect, useState } from "react";
import { CircularProgress, Card, CardContent, Typography } from '@mui/material';
import { ProductContext } from "../context/ProductContext";
import log from '../utils/logger'; 
import PieChart from '../components/PieChart'; // Import the PieChart component
import LowStockAlert from '../components/LowStockAlert'; // Import the LowStockAlert component
import Grid from '@mui/material/Grid'; // Use the stable Grid component

const Dashboard: React.FC = () => {
    const productContext = useContext(ProductContext); 
    const [totalValue, setTotalValue] = useState<number>(0); 

    useEffect(() => {
        if (productContext) {
            const { products, fetchProducts } = productContext; 

            const calculateTotalValue = () => {
                const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
                setTotalValue(total);
            };

            // Check if products array is not empty
            if (products.length === 0) {
                fetchProducts()
                    .then(() => {
                        calculateTotalValue();  // Calculate total value after fetching
                    })
                    .catch((error) => log.error('Error fetching products:', error));
            } else {
                calculateTotalValue();  // Calculate total value if products are already loaded
            }
        }
    }, [productContext]); 

    // Show loading spinner while fetching products
    if (!productContext || !productContext.products) {
        return <CircularProgress />;
    }

    const { products } = productContext; // Ensure products is defined

    return (
        <Grid container spacing={2}>
            {/* Total Inventory Value */}
            <Grid item xs={8}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Total Inventory Value</Typography>
                        <Typography variant="h6">${totalValue.toFixed(2)}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* Pie Chart for Stock Distribution */}
            <Grid item xs={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Stock Distribution by Product</Typography>
                        <PieChart />
                    </CardContent>
                </Card>
            </Grid>

            {/* Low Stock Alert */}
            <Grid item xs={4}>
                <Card>
                    <CardContent>
                        <LowStockAlert />
                    </CardContent>
                </Card>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Recent Activity</Typography>
                        <Typography variant="body1">Last updated: 10/10/2024</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
