// components/ProductList.tsx
import React, { useContext, useState } from 'react';
import {
    Box,
    Table,
    Button,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material';
import { ProductContext } from '../context/ProductContext'; // Import the ProductContext
import log from '../utils/logger'; // Import the logger for error handling

const ProductList: React.FC = () => {
    const productContext = useContext(ProductContext); // Use the context

    // Local state for handling edit dialog
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    if (!productContext) {
        return <CircularProgress />;
    }

    const { products, updateProduct, deleteProduct } = productContext;

    const handleOpenDialog = (product: any) => {
        setSelectedProduct(product);
        setName(product.name);
        setQuantity(product.quantity);
        setPrice(product.price);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedProduct(null);
    };

    const handleUpdate = () => {
        if (!selectedProduct || !selectedProduct._id) {
            console.error("Product ID is not defined.");
            return;
        }
    
        const updateData = {
            name: name,     
            quantity: quantity,
            price: price
        };
    
        updateProduct(selectedProduct._id, updateData);
        handleCloseDialog();  
    };
    
    const handleDelete = (_id: string) => {
        if (!_id) {
            console.error("Product ID is not defined.");
            return;
        }
        console.log("Attempting to delete product with ID:", _id); // Log the ID before deletion
        deleteProduct(_id);
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Product List
            </Typography>
            {products.length === 0 ? (
                <Typography>No products available</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Price ($)</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell align="right">{product.quantity}</TableCell>
                                    <TableCell align="right">{product.price.toFixed(2)}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => handleOpenDialog(product)}>Update</Button>
                                        <Button onClick={() => handleDelete(product._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {/* Update Dialog */}
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Update Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update the product details below.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Quantity"
                        type="number"
                        fullWidth
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProductList;
