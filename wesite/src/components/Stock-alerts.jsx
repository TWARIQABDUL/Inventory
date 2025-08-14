import React, {useEffect, useState} from "react";
import warning_yellow from "../assets/images/warning-yellow.png";
import "../styles/dashboard.css";

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
  const [StockAlertsList, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      const StockAlertsList = [
        { productName: "Wireless Mouse", stock: 60, category: "Electronics" },
        { productName: "Wireless Mouse", stock: 50, category: "Electronics" },
        { productName: "Wireless Mouse", stock: 40, category: "Electronics" },
        { productName: "Wireless Mouse", stock: 70, category: "Electronics" },
        { productName: "Wireless Mouse", stock: 80, category: "Electronics" },
      ];
      setAlerts(StockAlertsList);
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="stock-alerts">
      <div className="stock-alerts-title">
        <img src={warning_yellow} alt="Stock warning indicator" />
        <h2>Stock Alerts</h2>
      </div>
      {loading && <div className="spinner"></div>}
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
