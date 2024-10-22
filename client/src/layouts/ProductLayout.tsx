import React, { ReactNode } from "react";
import { Box, Typography } from '@mui/material';

interface ProductLayoutProps {
    title: string; 
    children: ReactNode;
}

const ProductLayout: React.FC<ProductLayoutProps> = ({ title, children }) => {
    return (
        <Box sx={{ padding: 4 }}>
            <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ fontWeight: 'bold', color: '#1ABC9C', textAlign: 'center' }}
            >
                {title}
            </Typography>
            <Box sx={{ mt: 4 }}>
                {children}
            </Box>
        </Box>
    );
};

export default ProductLayout;
