import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import useLowStockAlert from "../hooks/useLowStockAlert";
import { Alert, List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const LowStockAlert: React.FC = () => {
    const productContext = useContext(ProductContext);
    const products = productContext?.products || [];

    const lowStockProducts = useLowStockAlert(products, 5);

    return (
        <Box sx={{ mt: 4 }}>
            {lowStockProducts.length > 0 ? (
                <Alert severity="warning" sx={{ backgroundColor: '#ff9800', color: '#fff' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Low Stock Alert
                    </Typography>
                    <List>
                        {lowStockProducts.map(product => (
                            <ListItem key={product._id}>
                                <ListItemText
                                    primary={
                                        <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
                                            {`${product.name}: Only ${product.quantity} left!`}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            ) : (
                <Alert severity="success">
                    <Typography variant="h6">All products have sufficient stock!</Typography>
                </Alert>
            )}
        </Box>
    );
};

export default LowStockAlert;
