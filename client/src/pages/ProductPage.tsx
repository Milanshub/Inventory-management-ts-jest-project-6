import React, { useContext } from 'react';
import ProductLayout from '../layouts/ProductLayout'; 
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import { ProductContext } from '../context/ProductContext';

const ProductPage: React.FC = () => {
    const productContext = useContext(ProductContext);


    if (!productContext) {
        return <div>Loading...</div>; 
    }

    return (
        <ProductLayout title="Products"> 
            <ProductForm />
            <ProductList />
        </ProductLayout>
    );
};

export default ProductPage;
