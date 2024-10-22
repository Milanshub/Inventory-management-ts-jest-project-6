import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import useLowStockAlert from "../hooks/useLowStockAlert";
import { Alert, List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const LowStockAlert: React.FC = () => {
    const productContext = useContext(ProductContext);
    const products = productContext?.products || [];

    const lowStockProducts = useLowStockAlert(products, 5);

    return (
        <Box sx={{ mt: 4 }}>
            {lowStockProducts.length > 0 ? (
                <Alert 
                    severity="warning" 
                    icon={<WarningIcon fontSize="large" sx={{ color: '#fff' }} />} // Custom icon
                    sx={{ 
                        backgroundColor: '#E74C3C', // Coral Red
                        color: '#fff', 
                        borderRadius: '12px', // Rounded corners
                        boxShadow: 3, // Add shadow to create depth
                        padding: 3, // Add padding for better spacing
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Low Stock Alert
                    </Typography>
                    <List>
                        {lowStockProducts.map(product => (
                            <ListItem key={product._id}>
                                <ListItemText
                                    primary={
                                        <Typography 
                                            variant="body1" 
                                            sx={{ 
                                                fontSize: '1.2rem', 
                                                fontWeight: 600 
                                            }}
                                        >
                                            {`${product.name}: Only ${product.quantity} left!`}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            ) : (
                <Alert 
                    severity="success" 
                    icon={<CheckCircleIcon fontSize="large" sx={{ color: '#fff' }} />} // Custom icon
                    sx={{ 
                        backgroundColor: '#1ABC9C', // Teal color for success
                        color: '#fff', 
                        borderRadius: '12px',
                        boxShadow: 3,
                        padding: 3,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>All products have sufficient stock!</Typography>
                </Alert>
            )}
        </Box>
    );
};

export default LowStockAlert;
