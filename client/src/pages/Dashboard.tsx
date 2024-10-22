import React, { useContext, useEffect, useState } from "react";
import { CircularProgress, Card, CardContent, Typography } from '@mui/material';
import { ProductContext } from "../context/ProductContext";
import PieChart from '../components/PieChart'; 
import LowStockAlert from '../components/LowStockAlert'; 
import Grid2 from '@mui/material/Grid2'; // Assuming you're using this specific Grid2 component
import DashboardLayout from "../layouts/DashboardLayout";
import LastActivity from "../components/LastActivity";
import CountUp from 'react-countup'; 

const Dashboard: React.FC = () => {
    const productContext = useContext(ProductContext); 
    const [totalValue, setTotalValue] = useState<number>(0); 

    useEffect(() => {
        if (productContext) {
            const { products } = productContext; 

            const calculateTotalValue = () => {
                const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
                setTotalValue(total);
            };

            calculateTotalValue();
        }
    }, [productContext]); 
    
    if (!productContext || !productContext.products) {
        return <CircularProgress />;
    }

    return (
        <DashboardLayout>
            {/* Left Column: Stack Total Inventory Value, Low Stock Alert, and Last Update */}
            <Grid2 size={{ xs: 12, md: 6 }}>
                {/* Total Inventory Value */}
                <Card 
                    sx={{ 
                        padding: 4, 
                        boxShadow: 4, 
                        borderRadius: '16px', 
                        backgroundColor: 'background.paper', 
                        color: 'text.primary',
                        marginBottom: 2,
                        textAlign: 'center',
                    }}
                >
                    <CardContent>
                        <Typography  variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Total Inventory Value</Typography>
                        <Typography 
                            variant="h2" 
                            sx={{ 
                                fontWeight: 'bold', 
                                fontSize: '3rem', // Increase the font size
                                color: '#1ABC9C', // Teal color for the number (aligned with the theme)
                                mb: 2 
                            }}
                        >$ 
                            <CountUp 
                                start={0} 
                                end={totalValue} 
                                duration={2.5} 
                                separator="," // Add thousands separator
                                decimals={2} // Ensure two decimal places
                                decimal="."
                            />
                        </Typography>
                    </CardContent>
                </Card>

                {/* Low Stock Alert */}
                <Card 
                    sx={{ 
                        padding: 3, 
                        boxShadow: 3, 
                        borderRadius: '16px', 
                        backgroundColor: 'background.paper', 
                        color: 'text.primary',
                        marginBottom: 2  // Separate stacked cards with margin
                    }}
                >
                    <CardContent>
                        <LowStockAlert />
                    </CardContent>
                </Card>

                {/* Last Activity (Last Update) */}
                <Card 
                    sx={{ 
                        padding: 3, 
                        boxShadow: 3, 
                        borderRadius: '16px', 
                        backgroundColor: '#F7F9F9', // Light background for contrast
                        color: '#1ABC9C', // Teal color for text
                        textAlign: 'center', // Center the content
                    }}
                >
                    <CardContent>
                        <LastActivity />
                    </CardContent>
                </Card>
            </Grid2>

            {/* Right Column: Pie Chart */}
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Card 
                    sx={{ 
                        padding: 3, 
                        boxShadow: 3, 
                        borderRadius: '16px', 
                        backgroundColor: 'background.paper', 
                        color: 'text.primary',
                        height: '100%'
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Stock Distribution by Product</Typography>
                        <PieChart />
                    </CardContent>
                </Card>
            </Grid2>
        </DashboardLayout>
    );
};

export default Dashboard;
