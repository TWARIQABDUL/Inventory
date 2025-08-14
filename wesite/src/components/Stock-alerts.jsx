import React from "react";
import warning_yellow from "../assets/images/warning-yellow.png";
import "../styles/dashboard.css";

export const StockAlertsList = [
  { productName: "Wireless Mouse", stock: 60, category: "Electronics" },
  { productName: "Wireless Mouse", stock: 5, category: "Electronics" },
  { productName: "Wireless Mouse", stock: 6, category: "Electronics" },
  { productName: "Wireless Mouse", stock: 20, category: "Electronics" },
  { productName: "Wireless Mouse", stock: 13, category: "Electronics" },
];

export function StockAlerts({ productName, stock, category }) {
  return (
    <div className="alert-container">
      <div className="product">
        <div className="product-name">{productName}</div>
        <div className="product-category">{category}</div>
      </div>
      <div className="stock-level">
        <div
          className={`stock-level-good ${
            stock <= 50 && stock > 0
              ? "stock-level-bad"
              : stock > 50 && stock < 100
              ? "stock-level-medium"
              : ""
          }`}
        >
          {` ${
            stock <= 50 && stock > 0
              ? "Low Stock"
              : stock > 50 && stock < 100
              ? "medium Stock"
              : "In stock"
          }`}
        </div>
        <div className="stock-level-value">{stock}</div>
      </div>
    </div>
  );
}

export function Alerts() {
  return (
    <div className="stock-alerts">
      <div className="stock-alerts-title">
        <img src={warning_yellow} alt="Stock warning indicator" />
        <h2>Stock Alerts</h2>
      </div>
      <div className="stock-alerts-list">
        {StockAlertsList.map((alert) => {
          return (
            <StockAlerts
              key={alert.productName}
              productName={alert.productName}
              stock={alert.stock}
              category={alert.category}
            />
          );
        })}
      </div>
    </div>
  );
}
