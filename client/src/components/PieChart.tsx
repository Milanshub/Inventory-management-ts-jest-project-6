import React, { useEffect, useState, useContext } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { ProductContext } from '../context/ProductContext';
import { IProduct } from '../models/productModel';

Chart.register(...registerables);

const PieChart: React.FC = () => {
    const productContext = useContext(ProductContext);
    const [chartData, setChartData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!productContext?.products) {
            console.error('Product context or products not available');
            setLoading(false);
            return;
        }

        const products: IProduct[] = productContext.products;

        if (products.length === 0) {
            console.error('No products available to display in the chart');
            setLoading(false);
            return;
        }

        const labels = products.map((product: IProduct) => product.name);
        const data = products.map((product: IProduct) => product.quantity);

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Quantity per Product',
                    data: data,
                    backgroundColor: [
                        '#FF6384', // Red
                        '#36A2EB', // Blue
                        '#FFCE56', // Yellow
                        '#4BC0C0', // Teal
                        '#9966FF', // Purple
                        '#FF9F40', // Orange
                    ],
                    borderColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                    ],
                    borderWidth: 1,
                },
            ],
        });

        setLoading(false); // Data is ready, stop loading
    }, [productContext?.products]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '550px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!chartData) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '550px' }}>
                <Typography variant="h6">No chart data available</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '550px', padding: 2 }}>
            <Pie
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    size: 14,
                                },
                            },
                        },
                    },
                }}
            />
        </Box>
    );
};

export default PieChart;
