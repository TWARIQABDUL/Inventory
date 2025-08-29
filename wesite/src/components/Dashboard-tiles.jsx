import React, { useState, useEffect } from "react";
import { Card, Col, Row, Statistic, Typography, message } from "antd";
import {
  ShoppingOutlined,
  DollarOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

export default function DashboardTiles() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [loading, setLoading] = useState(true);
  const [tileStat, setTileStat] = useState({
    totalItems: 0,
    totalValue: 0,
    lowStock: 0,
    outOfStock: 0,
    profit: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/products`);
        const data = await res.json();

        const totalItems = data.length;
        const totalValue = data.reduce(
          (sum, item) => sum + (item.productCost || 0) * (item.inStock || 0),
          0
        );
        const lowStock = data.filter(
          (item) => item.inStock > 0 && item.inStock <= 5
        ).length;
        const outOfStock = data.filter((item) => item.inStock === 0).length;

        setTileStat({ totalItems, totalValue, lowStock, outOfStock });
      } catch (error) {
        console.error("Failed to fetch products:", error);
        message.error("Could not load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [baseUrl]);

  useEffect(() => {
    const fetchOrderMoney = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/orders`);
        const data = await res.json();

        console.log(data);

        const totalAmount = data.reduce(
          (sum, order) => sum + (order.actualAmount || 0),
          0
        );
        setTileStat(prev => ({ ...prev, profit: totalAmount }));
      } catch (error) {
        console.error("Failed to fetch order data:", error);
        message.error("Could not load order stats");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderMoney();
  }, [baseUrl]);

  const tileData = [
    {
      key: "total-items",
      title: "Total Items",
      icon: <ShoppingOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
      content: <Statistic value={tileStat.totalItems} />,
      footer: "+0 items added this week",
    },
    {
      key: "total-value",
      title: "Total Value",
      icon: <DollarOutlined style={{ fontSize: 24, color: "#52c41a" }} />,
      content: <Statistic value={tileStat.totalValue} prefix="$" precision={2} />,
      footer: "Inventory worth",
    },
    {
      key: "stock",
      title: "Stock",
      icon: <WarningOutlined style={{ fontSize: 24, color: "#faad14" }} />,
      content: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text strong style={{fontSize: 13}}>{tileStat.lowStock} low</Text>
          <Text type="danger" style={{fontSize: 13}}>{tileStat.outOfStock} out</Text>
        </div>
      ),
      footer: "Items need restocking",
    },
    {
      key: "profit",
      title: "Profit",
      icon: <DollarOutlined style={{ fontSize: 24, color: "#52c41a" }} />,
      content: <Statistic value={tileStat.profit} prefix="$" precision={2} />,
      footer: "Total Amount Made",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {tileData.map((tile) => (
        <Col key={tile.key} xs={24} sm={12} lg={6}>
          <Card title={tile.title} extra={tile.icon} loading={loading}>
            {tile.content}
            <Text type="secondary" style={{ marginTop: 8, display: "block" }}>
              {tile.footer}
            </Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
