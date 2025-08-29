import React from "react";
import { Card, List, Tag, Typography, Flex, Empty } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "../styles/dashboard.css";

const { Text } = Typography;

function getStockStatus(stock) {
  if (stock <= 5 && stock >= 0) {
    return { text: "Low Stock", color: "red" };
  } else if (stock > 5 && stock <= 10) {
    return { text: "Medium Stock", color: "gold" };
  }
  return { text: "In Stock", color: "green" };
}

function StockAlertItem({ productName, stock, category }) {
  const status = getStockStatus(stock);
  return (
    <List.Item>
      <Card size="small" style={{ width: "100%" }}>
        <Flex justify="space-between" align="center">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text strong>{productName}</Text>
            <Text type="secondary">{category}</Text>
          </div>
          <Tag color={status.color}>{status.text}</Tag>
        </Flex>
      </Card>
    </List.Item>
  );
}

export function Alerts({ items = [] }) {
  // Only include items with stock ≤ 10
  const lowStockItems = items.filter((item) => item.inStock <= 10);

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
      style={{ width: "100%" }}
    >
      {lowStockItems.length > 0 ? (
        <List
          dataSource={lowStockItems}
          renderItem={(alert, index) => (
            <StockAlertItem
              key={alert.productName + index}
              productName={alert.productName}
              stock={alert.inStock}
              category={alert.categoryName}
            />
          )}
        />
      ) : (
        <Empty description="No low stock alerts" />
      )}
    </Card>
  );
}
