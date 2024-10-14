import React, { useContext, useState, useEffect} from "react";
import { TextField, Button, Box, Typography, Stack, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ProductContext } from "../context/ProductContext";
import log from "../utils/logger";

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ProductForm: React.FC = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState<string | number>(0);
    const [price, setPrice] = useState<string | number>(0);

    const productContext = useContext(ProductContext); 

    useEffect(() => {
        if (productContext) {
            productContext.fetchProducts().catch((error) => {
                log.error('Failed to fetch products on mount', error);
            }); 
        };
    }, [productContext]); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        if (productContext) {
            await productContext.addProduct({name, quantity: Number(quantity), price: Number(price)}); 

            setName('');
            setQuantity(0);
            setPrice(0);
        }
    };

    return (
        <Box  component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography variant="h5" gutterBottom>Add Product</Typography>
            <Stack spacing={2}>
                <Item>
                    <TextField
                        label='Name'
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Item>
                <Item>
                    <TextField
                        label="Quantity"
                        variant="outlined"
                        fullWidth
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </Item>
                <Item>
                    <TextField
                        label="Price"
                        variant="outlined"
                        fullWidth
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </Item>
                <Item>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Save Product</Button>
                </Item>
            </Stack>
        </Box>
    );
};

export default ProductForm; 