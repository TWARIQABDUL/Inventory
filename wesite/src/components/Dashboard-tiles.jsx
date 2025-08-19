import React, {useState, useEffect} from "react";
import {Card, Col, Row, Statistic, Typography} from "antd";
import { ShoppingOutlined, DollarOutlined, WarningOutlined } from "@ant-design/icons";
const {Text} = Typography;

export default function DashboardTiles({items = []}) {
  const [loading, setLoading] = useState(true);
  const [tileStat, setTileStat] = useState({
    totalItems: 0,
    totalValue: 0,
    lowStock: 0,
    outOfStock: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const totalItems = items.length;
    const totalValue = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const lowStock = items.filter(
      (item) => item.quantity > 0 && item.quantity <= 5
    ).length;
    const outOfStock = items.filter((item) => item.quantity === 0).length;

    setTileStat({totalItems, totalValue, lowStock, outOfStock});
  }, [items]);

  const tileData = [
    {
      key: "total-items",
      title: "Total Items",
      icon: <ShoppingOutlined style={{fontSize: 24, color: "#1890ff"}}/>,
      value: tileStat.totalItems,
      footer: "+0 items added this week",
    },
    {
      key: "total-value",
      title: "Total Value",
      icon: <DollarOutlined style={{fontSize: 24, color: "#52c41a"}}/>,
      value: tileStat.totalValue,
      prefix: "$",
      footer: "Inventory worth",
    },
    {
      key: "low-stock",
      title: "Low Stock",
      icon: <WarningOutlined style={{fontSize: 24, color: "#faad14"}}/>,
      value: tileStat.lowStock,
      footer: "Items need restocking",
    },
    {
      key: "out-of-stock",
      title: "Out of Stock",
      icon: <WarningOutlined style={{fontSize: 24, color: "#f5222d"}}/>,
      value: tileStat.outOfStock,
      footer: "Items unavailable",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {tileData.map((tile) => (
        <Col key={tile.key} xs={24} sm={12} lg={6}>
          <Card title={tile.title} extra={tile.icon} loading={loading}>
            <Statistic value={tile.value} prefix={tile.prefix}/>
            <Text type="primary" style={{marginTop: 8, display: "block"}}>
              {tile.footer}
            </Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
