import React, { useContext, useEffect, useState } from 'react';
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

    // Fetch products only if not already fetched
    useEffect(() => {
        const fetchProducts = async () => {
            if (productContext && productContext.products.length === 0) {
                try {
                    await productContext.fetchProducts();
                } catch (error) {
                    log.error('Failed to fetch products on ProductList mount', error);
                }
            }
        };

        fetchProducts();
    }, [productContext]); // This ensures the fetch only happens if products are not already fetched

    // If the context or products aren't available yet, show a loading spinner
    if (!productContext) {
        return <CircularProgress />;
    }

    const { products, updateProduct, deleteProduct } = productContext;

    // Debugging: Check the products array
    console.log(products);

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

    const handleUpdate = async () => {
        if (selectedProduct) {
            const updateData = {
                name,
                quantity,
                price,
            };
            console.log("Updating product with ID:", selectedProduct.id, "Data:", updateData); // Log ID and data
    
            try {
                await updateProduct(selectedProduct.id, updateData);
                handleCloseDialog(); // Close the dialog on success
            } catch (error) {
                log.error('Failed to update product', error);
            }
        }
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
                                        <Button onClick={() => handleDelete(product._id)} color="error">
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Edit Dialog */}
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To update this product, please edit the fields below.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Quantity"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                    <TextField
                        margin="dense"
                        label="Price ($)"
                        type="number"
                        fullWidth
                        variant="standard"
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
