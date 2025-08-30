import { useState, useEffect } from "react";

/**
 * Custom hook to fetch and manage products.
 * Provides loading state and CRUD operations.
 */
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products when the hook is first used
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=10");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add a new product
  const addProduct = (product) => {
    const newProduct = { id: Date.now(), ...product };
    setProducts((prev) => [newProduct, ...prev]);
  };

  // Update an existing product by id
  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p))
    );
  };

  // Remove a product by id
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return { products, loading, addProduct, updateProduct, deleteProduct };
};
