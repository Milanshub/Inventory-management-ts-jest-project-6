import React, { useContext, useEffect, useState } from "react";
import { CircularProgress, Card, CardContent, Typography } from '@mui/material';
import { ProductContext } from "../context/ProductContext";
import log from '../utils/logger'; 
import PieChart from '../components/PieChart'; 
import LowStockAlert from '../components/LowStockAlert'; 
import Grid2 from '@mui/material/Grid2'; 
import DashboardLayout from "../layouts/DashboardLayout";
import LastActivity from "../components/LastActivity";

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
            <Grid2
                size={{ xs: 12, sm: 6, md: 6 }}
            >
                <Card sx={{ paddingY: 11.7 }} >
                    <CardContent>
                        <Typography variant="h5">Total Inventory Value</Typography>
                        <Typography variant="h3">${totalValue.toFixed(2)}</Typography>
                    </CardContent>
                </Card>  

                {/* Pie Chart for Stock Distribution */}
                <Card sx={{paddingY: 11.7 }}>
                    <CardContent>
                        <LowStockAlert />
                    </CardContent>
                </Card>
            </Grid2>
            
            <Grid2
               size={{ xs: 12, sm: 6, md: 6 }}
            >
                <Card sx={{ padding: 3,  height: '100%'  }}>
                    <CardContent>
                        <Typography variant="h5">Stock Distribution by Product</Typography>
                        <PieChart />
                    </CardContent>
                </Card>
            </Grid2>

            {/* Recent Activity */}
            <Grid2
                size={{ xs: 12, sm: 12, md: 12 }}
            >
                <Card sx={{ padding: 3 }}>
                    <CardContent>
                        <LastActivity />
                    </CardContent>
                </Card>
            </Grid2>
        </DashboardLayout>
    );
};

export default Dashboard;
