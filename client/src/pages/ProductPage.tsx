import React from 'react';
import { Grid2, Box } from '@mui/material';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

const ProductPage: React.FC = () => {
    return (
        <Box sx={{ padding: 4 }}>
            <Grid2 container spacing={4}>
                {/* ProductForm */}
                <Grid2 size={{ xs: 12, md: 12 }}>
                    <Box sx={{ maxWidth: '450px', margin: '0 auto' }}> {/* Keep form width consistent */}
                        <ProductForm />
                    </Box>
                </Grid2>

                {/* ProductList */}
                <Grid2 size={{ xs: 12, md: 12 }}>
                    <Box sx={{ width: '100%' }}> {/* Ensure product list fills width */}
                        <ProductList />
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default ProductPage;
