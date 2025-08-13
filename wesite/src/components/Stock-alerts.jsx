import React from "react";

export const StockAlertsList = [
  {productName: "Wireless Mouse", stock: 10, category: "Electronics"},
  {productName: "Wireless Mouse", stock: 10, category: "Electronics"},
  {productName: "Wireless Mouse", stock: 10, category: "Electronics"},
  {productName: "Wireless Mouse", stock: 10, category: "Electronics"},
  {productName: "Wireless Mouse", stock: 10, category: "Electronics"}
]

export function StockAlerts({productName, stock, category}){
  return(
    <>
      <div className="alert-container">
        <div className="product">
          <div className="product-name">{productName}</div>
          <div className="product-category">{category}</div>
        </div>
        <div className="stock-level">
          <div className="stock-level-text">in stock</div>
          <div className="stock-level-value">{stock}</div>
        </div>
      </div>
    </>
  );
}

export function Alerts(){
  return (
    <div className="stock-alerts">
      <div className="stock-alerts-title">
        <img src="../assets/images/warning-yellow.png" alt="warning-yellow"/>
        <h2>Stock Alerts</h2>
      </div>
      <div className="stock-alerts-list">
        {
          StockAlertsList.map((alert) => {
            return <StockAlerts key={alert.titleName} titleName={alert.titleName} titleIcon={alert.titleIcon} tileBody={alert.tileBody}/>
          })
        }
      </div>
    </div>
  );
}