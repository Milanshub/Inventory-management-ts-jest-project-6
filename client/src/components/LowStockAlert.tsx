import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import useLowStockAlert from "../hooks/useLowStockAlert"
import { Alert, List, ListItem, ListItemText } from '@mui/material';

const LowStockAlert: React.FC = () => {
    const productContext = useContext(ProductContext);
    const products = productContext?.products || [];

    const lowStockProducts = useLowStockAlert(products, 5);

    return (
        <div>
            {lowStockProducts.length > 0 ? (
                <Alert severity="warning">
                    <h3>Low Stock Alert</h3>
                    <List>
                        {lowStockProducts.map(product => (
                            <ListItem key={product._id}>
                                <ListItemText
                                    primary={`${product.name}: Only ${product.quantity} left!`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            ) : (
                <Alert severity="success">All products have sufficient stock!</Alert>
            )}
        </div>
    );
};

export default LowStockAlert;
