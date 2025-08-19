import React, { useEffect, useState } from "react";
import { Card, List, Spin, Tag, Typography, Flex } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "../styles/dashboard.css";
const { Text } = Typography;

function getStockStatus(stock) {
  if (stock <= 50 && stock > 0) {
    return { text: "Low Stock", color: "red" };
  } else if (stock > 50 && stock < 100) {
    return { text: "Medium Stock", color: "gold" };
  }
  return { text: "In Stock", color: "green" };
}

export function StockAlerts({ productName, stock, category }) {
  const status = getStockStatus(stock);
  return (
    <List.Item>
      <Card size="small" style={{ width: "100%" }}>
        <Flex justify="space-between" align="center">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text strong>{productName}</Text>
            <Text>{category}</Text>
          </div>
          <Tag color={status.color}>{status.text}</Tag>
        </Flex>
      </Card>
    </List.Item>
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
    <Card
      title={
        <span>
          <ExclamationCircleOutlined
            style={{ color: "#faad14", marginRight: 8 }}
          />
          Stock Alerts
        </span>
      }
      style={{width: "100%" }}
    >
      <List
        dataSource={StockAlertsList}
        renderItem={(alert, index) => (
          <StockAlerts
            key={alert.productName + index}
            productName={alert.productName}
            stock={alert.stock}
            category={alert.category}
          />
        )}
      />
    </Card>
  );
}
