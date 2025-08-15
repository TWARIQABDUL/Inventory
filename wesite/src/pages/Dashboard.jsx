import React from "react";
import DashboardTiles from "../components/Dashboard-tiles.jsx";
import { Alerts } from "../components/Stock-alerts.jsx";
import { Stats } from "../components/Stats.jsx";
import { ProductList } from "../components/ProductList.jsx";
import "../styles/dashboard.css";
import {Button, Flex} from "antd"
import { Typography } from 'antd';
const { Title } = Typography;


export function Dashboard() {
  return (
    <main className="dashboard">
      <div className="dashboard-content">
        <Flex justify="space-between" >
          <Flex vertical="vertical" gap={0}>
            <Title level={2}>Dashboard</Title>
            <Title level={4}>Overview of Your inventory management System</Title>
          </Flex>
          <Button type={"primary"} onClick={() => {}} className="add-button" size={"large"}>Add +</Button>
        </Flex>
        <DashboardTiles />
        <Flex justify="space-between" gap={30}>
          <Alerts />
          <Stats />
        </Flex>
        <ProductList />
      </div>
    </main>
  );
}
