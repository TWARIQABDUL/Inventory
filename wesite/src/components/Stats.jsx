import React, {useEffect, useState} from "react";
import {Card, Flex} from "antd";
import {Typography} from "antd";
import {LineChartOutlined} from "@ant-design/icons";
const {Title, Text} = Typography;

function StatsList({statName, statValue}) {
  return (
    <Flex justify="space-between">
      <Title level={5}>{statName}</Title>
      <Text>{statValue}</Text>
    </Flex>
  );
}

export function Stats({items = []}) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
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

    setStats({totalItems, totalValue, lowStock, outOfStock});
  }, [items]);

  const statsList = [
    {statName: "Total Products:", statValue: stats.totalItems},
    {statName: "Low Stock Items:", statValue: stats.lowStock},
    {statName: "Out of Stock:", statValue: stats.outOfStock},
    {statName: "Total Asset Value:", statValue: stats.totalValue},
  ];

  return (
    <Card
      title={
        <span>
          <LineChartOutlined/>
          Quick Stats
        </span>
      }
      style={{width: "100%", height: "50%"}}
    >
      {statsList.map((stat, index) => (
        <StatsList
          key={stat.statName + index}
          statName={stat.statName}
          statValue={stat.statValue}
        />
      ))}
    </Card>
  );
}
