import React, { useState, useEffect } from "react";
import { Card, Col, Row, Statistic, Typography } from "antd";
import {
  ShoppingOutlined,
  DollarOutlined,
  WarningOutlined,
} from "@ant-design/icons";
const { Text } = Typography;

const tileData = [
  {
    key: "total-items",
    title: "Total Items",
    icon: <ShoppingOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
    value: 12,
    footer: "+0 items added this week",
  },
  {
    key: "total-value",
    title: "Total Value",
    icon: <DollarOutlined style={{ fontSize: 24, color: "#52c41a" }} />,
    value: 31771,
    prefix: "$",
    footer: "Inventory worth",
  },
  {
    key: "low-stock",
    title: "Low Stock",
    icon: <WarningOutlined style={{ fontSize: 24, color: "#faad14" }} />, 
    value: 2,
    footer: "Items need restocking",
  },
  {
    key: "out-of-stock",
    title: "Out of Stock",
    icon: <WarningOutlined style={{ fontSize: 24, color: "#f5222d" }} />,
    value: 2,
    footer: "Items Unavailable",
  },
];

export default function DashboardTiles() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Row gutter={[16, 16]}>
      {tileData.map((tile) => (
        <Col key={tile.key} xs={24} sm={12} lg={6}>
          <Card title={tile.title} extra={tile.icon} loading={loading}>
            <Statistic value={tile.value} prefix={tile.prefix} />
            <Text type="primary" style={{ marginTop: 8, display: "block" }}>
              {tile.footer}
            </Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
