import React, { ReactNode} from "react";
import { Box, Stack, Typography } from '@mui/material';


interface ProductLayoutProps {
    title: string; 
    children: ReactNode;
};

const ProductLayout: React.FC<ProductLayoutProps> = ({ title, children }) => {
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>
            <Stack spacing={3}>
                {children}
            </Stack>
        </Box>
    );
};

export default ProductLayout; 