// useLowStockAlert.ts
import { useEffect, useState } from 'react';
import { IProduct } from '../models/productModel';
import { toast } from 'react-toastify';

const useLowStockAlert = (products: IProduct[], threshold = 5) => {
  const [lowStockProducts, setLowStockProducts] = useState<IProduct[]>([]);
  const [alertedProducts, setAlertedProducts] = useState<string[]>([]); // Track alerted products

  useEffect(() => {
    const lowStock = products.filter(product => product.quantity < threshold);
    setLowStockProducts(lowStock);

    // Trigger toast notifications for low stock products
    lowStock.forEach(product => {
      if (!alertedProducts.includes(product._id)) { // Check if already alerted
        toast.warn(`${product.name}: Only ${product.quantity} left!`, {
          position: "top-right",
          style: { backgroundColor: '#007bff', color: '#fff' },
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Add product to alerted list
        setAlertedProducts(prev => [...prev, product._id]);
      }
    });
  }, [products, threshold, alertedProducts]);

  return lowStockProducts;
};

export default useLowStockAlert;
