// useLowStockAlert.ts
import { useEffect, useState } from 'react';
import { IProduct } from '../models/productModel';
import { toast } from 'react-toastify'; // Import toast from react-toastify

const useLowStockAlert = (products: IProduct[], threshold = 5) => {
  const [lowStockProducts, setLowStockProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const lowStock = products.filter(product => product.quantity < threshold);
    setLowStockProducts(lowStock);

    // Trigger toast notifications for low stock products
    if (lowStock.length > 0) {
      lowStock.forEach(product => {
        toast.warn(`${product.name}: Only ${product.quantity} left!`, {
          position: "top-right", // Position of the toast notification
          autoClose: 5000, // Duration before the toast closes
          hideProgressBar: false, // Show progress bar
          closeOnClick: true, // Allow clicking to close
          pauseOnHover: true, // Pause on hover
          draggable: true, // Allow dragging to close
          progress: undefined, // Progress bar value
        });
      });
    }
  }, [products, threshold]);

  return lowStockProducts;
};

export default useLowStockAlert;
