import React from 'react';
import {Search} from "lucide-react";

const products = [
  { id: 1, name: 'Laptop', price: 1200, quantity: 10 },
  { id: 2, name: 'Mouse', price: 25, quantity: 50 },
  { id: 3, name: 'Keyboard', price: 75, quantity: 30 },
  { id: 4, name: 'Monitor', price: 300, quantity: 15 },
];

export function ProductList() {
  return (
    <div className="product-list">
      <div className="product-header">
        <h2>Product List</h2>
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
          />
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th style={{ width: 70 }}>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="product-row">
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.stock ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
