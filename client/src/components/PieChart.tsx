import React, { useEffect, useState, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { ProductContext } from '../context/ProductContext';
import { IProduct } from '../models/productModel';

Chart.register(...registerables);

const PieChart: React.FC = () => {
    const productContext = useContext(ProductContext);
    const [chartData, setChartData] = useState<any>(null); // Initially null to indicate no data

    useEffect(() => {
        if (!productContext || !productContext.products) {
            console.error('Product context or products not available');
            return;
        }

        const products: IProduct[] = productContext.products; // Ensure products is an array of IProduct

        if (products.length === 0) {
            console.error('No products available to display in the chart');
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
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        });
    }, [productContext]);

    if (!chartData) {
        return <div>No chart data available.</div>; // Handle empty chart data
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '550px' }}>
            <Pie data={chartData} style={{padding: 8}} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
    );
};

export default PieChart;
