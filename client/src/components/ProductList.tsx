import React, { useContext, useState } from 'react';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Grid,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { ProductContext } from '../context/ProductContext'; 
import ListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';

const ProductList: React.FC = () => {
    const productContext = useContext(ProductContext); 
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list'); // View mode state
    const [open, setOpen] = useState(false); // Dialog state
    const [selectedProduct, setSelectedProduct] = useState<any>(null); // Track selected product
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);

    if (!productContext) {
        return <div>Loading...</div>;
    }

    const { products, deleteProduct, updateProduct } = productContext;

    const toggleViewMode = () => {
        setViewMode(prevMode => (prevMode === 'list' ? 'grid' : 'list'));
    };

    // Handle opening dialog and setting selected product
    const handleOpenDialog = (product: any) => {
        setSelectedProduct(product);
        setName(product.name);
        setQuantity(product.quantity);
        setPrice(product.price);
        setOpen(true);
    };

    // Handle closing dialog
    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedProduct(null);
    };

    // Handle updating product
    const handleUpdate = () => {
        if (selectedProduct && selectedProduct._id) {
            updateProduct(selectedProduct._id, { name, quantity, price });
            handleCloseDialog();
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* Full-width container */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Product List
                </Typography>
                <IconButton onClick={toggleViewMode}>
                    {viewMode === 'list' ? <GridViewIcon /> : <ListIcon />}
                </IconButton>
            </Box>

            {viewMode === 'list' ? (
                <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: 3, width: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price ($)</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map(product => (
                                <TableRow key={product._id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell align="right">{product.quantity}</TableCell>
                                    <TableCell align="right">{product.price.toFixed(2)}</TableCell>
                                    <TableCell align="right">
                                        <Button 
                                            onClick={() => handleOpenDialog(product)} 
                                            sx={{ color: '#1ABC9C', fontWeight: 'bold' }}>
                                            Update
                                        </Button>
                                        <Button 
                                            onClick={() => deleteProduct(product._id)} 
                                            sx={{ color: '#E74C3C', fontWeight: 'bold' }}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Grid container spacing={3} sx={{ width: '100%' }}>
                    {products.map(product => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                            <Paper sx={{ padding: 2, borderRadius: '12px', boxShadow: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {product.name}
                                </Typography>
                                <Typography>Quantity: {product.quantity}</Typography>
                                <Typography>Price: ${product.price.toFixed(2)}</Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Button 
                                        onClick={() => handleOpenDialog(product)} 
                                        sx={{ color: '#1ABC9C', fontWeight: 'bold', marginRight: 2 }}
                                        data-testid="update-button" 
                                        >
                                        Update
                                    </Button>
                                    <Button 
                                        onClick={() => deleteProduct(product._id)} 
                                        sx={{ color: '#E74C3C', fontWeight: 'bold' }}>
                                        Delete
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Update Dialog */}
            <Dialog 
                open={open} 
                onClose={handleCloseDialog} 
                maxWidth="sm" 
                fullWidth 
                PaperProps={{ sx: { borderRadius: '24px' }}} // More rounded corners
            >
                <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', paddingTop: '32px' }}>
                    Update Product
                </DialogTitle>
                <DialogContent sx={{ paddingTop: '16px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, padding: "3 1.5" }}>
                        <TextField
                            label="Name"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ marginBottom: '16px' }}
                        />
                        <TextField
                            label="Quantity"
                            fullWidth
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            sx={{ marginBottom: '16px' }}
                        />
                        <TextField
                            label="Price"
                            fullWidth
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ padding: '16px' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}> {/* Keeps buttons together */}
                        <Button onClick={handleCloseDialog} sx={{ color: '#1ABC9C', fontWeight: 'bold' }}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdate} data-testid="update-button" type="submit" variant="contained" sx={{ backgroundColor: '#1ABC9C', fontWeight: 'bold' }}>
                            Update
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProductList;
