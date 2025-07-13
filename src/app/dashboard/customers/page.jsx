'use client';
import { useState } from 'react';

export default function Customers() {
  const [products] = useState([
    { id: 1, name: 'T-Shirt', price: '$25', stock: 100, status: 'Active' },
    { id: 2, name: 'Jeans', price: '$60', stock: 50, status: 'Active' },
    { id: 3, name: 'Jacket', price: '$120', stock: 25, status: 'Inactive' }
  ]);

  return (
    <div className="products">
      <div className="products-header">
        <h2>Products</h2>
        <button className="btn-add">Add Product</button>
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
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.status}</td>
                <td>
                  <button className="btn-edit">Edit</button>
                  <button className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <style jsx>{`
        .products-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .products-header h2 {
          margin: 0;
          color: #333;
        }
        
        .btn-add {
          background-color: #28a745;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .products-table {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        
        th {
          background-color: #f8f9fa;
          font-weight: 600;
          color: #333;
        }
        
        .btn-edit, .btn-delete {
          padding: 5px 10px;
          margin-right: 5px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        }
        
        .btn-edit {
          background-color: #007bff;
          color: white;
        }
        
        .btn-delete {
          background-color: #dc3545;
          color: white;
        }
      `}</style>
    </div>
  );
}