import React, { useContext, useState } from "react";
import { TextField, Button, Box, Typography, Stack } from '@mui/material';
import { ProductContext } from "../context/ProductContext";

const ProductForm: React.FC = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState<string | number>(0);
    const [price, setPrice] = useState<string | number>(0);

    const productContext = useContext(ProductContext); 

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
        <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
                mt: 4, 
                backgroundColor: '#F7F9F9', 
                padding: 3, 
                borderRadius: '12px', 
                boxShadow: 3 
            }}
        >
        
            <Stack spacing={2}>
                <TextField
                    name="name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                />
                <TextField
                    name="quantity"
                    type="quantity"
                    variant="outlined"
                    fullWidth
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                />
                <TextField
                    name="price"
                    type="price"
                    variant="outlined"
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                />
                <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth 
                    sx={{ 
                        backgroundColor: '#1ABC9C', 
                        color: '#fff', 
                        padding: 1.5, 
                        borderRadius: '8px', 
                        '&:hover': {
                            backgroundColor: '#17A589'
                        } 
                    }}
                >
                    Save Product
                </Button>
            </Stack>
        </Box>
    );
};

export default ProductForm;
