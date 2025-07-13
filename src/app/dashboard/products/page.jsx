'use client';
import { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import "../products/product.css";
import ProductModal from '@/component/ProductModal';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;
  
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);
  
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products?page=${page}&limit=${limit}`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
        setTotalPages(data.totalPages);
        setTotal(data.total);
        setCurrentPage(data.currentPage);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };
  
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };
  
  const handleDeleteProduct = async (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          fetchProducts();
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };
  
  const handleSaveProduct = () => {
    fetchProducts(currentPage);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  if (loading) return <div>Loading...</div>;

  return (
    <div className="products">
      <div className="products-header">
        <h2>Products ({total} total)</h2>
        <button className="btn-add" onClick={handleAddProduct}>Add Product</button>
      </div>
      
      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id.slice(-6)}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>{product.status}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEditProduct(product)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First 
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <Pagination.Item
                  key={page}
                  active={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Pagination.Item>
              );
            })}
            
            <Pagination.Next 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last 
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
      
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
}