import React, { useContext, useEffect, useState } from "react";
import { CircularProgress, Card, CardContent, Typography } from '@mui/material';
import { ProductContext } from "../context/ProductContext";
import log from '../utils/logger'; 
import PieChart from '../components/PieChart'; 
import LowStockAlert from '../components/LowStockAlert'; 
import Grid2 from '@mui/material/Grid2'; // Ensure you have the right import
import DashboardLayout from "../layouts/DashboardLayout";

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

            if (products.length === 0) {
                fetchProducts()
                    .then(() => {
                        calculateTotalValue();  
                    })
                    .catch((error) => log.error('Error fetching products:', error));
            } else {
                calculateTotalValue(); 
            }
        }
    }, [productContext]); 

    if (!productContext || !productContext.products) {
        return <CircularProgress />;
    }

    return (
        <DashboardLayout>
            {/* Total Inventory Value */}
            <Grid2 size={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Total Inventory Value</Typography>
                        <Typography variant="h6">${totalValue.toFixed(2)}</Typography>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <LowStockAlert />
                    </CardContent>
                </Card>
            </Grid2>

            {/* Pie Chart for Stock Distribution */}
            <Grid2 size={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Stock Distribution by Product</Typography>
                        <PieChart />
                    </CardContent>
                </Card>
            </Grid2>

            {/* Recent Activity */}
            <Grid2 size={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Recent Activity</Typography>
                        <Typography variant="body1">Last updated: 10/10/2024</Typography>
                    </CardContent>
                </Card>
            </Grid2>
        </DashboardLayout>
    );
};

export default Dashboard;
