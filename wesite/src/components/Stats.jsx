import React, { useEffect, useState } from "react";
import { Card, Flex } from "antd";
import { Typography } from "antd";
import { LineChartOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

export const statsList = [
  { statName: "Total Products:", statValue: "1,234" },
  { statName: "Low Stock Items:", statValue: "15" },
  { statName: "Out of Stock:", statValue: "3" },
  { statName: "Total Asset Value:", statValue: "8" },
];

function StatsList({ statName, statValue }) {
  return (
    <Flex justify="space-between">
      <Title level={5}>{statName}</Title>
      <Text>{statValue}</Text>
    </Flex>
  );
}

export function Stats() {
  const [statsList, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      const statsList = [
        { statName: "Total Products:", statValue: "1,234" },
        { statName: "Low Stock Items:", statValue: "15" },
        { statName: "Out of Stock:", statValue: "3" },
        { statName: "Total Asset Value:", statValue: "8" },
      ];
      setAlerts(statsList);
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <Card
      title={
        <span>
          <LineChartOutlined />
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
