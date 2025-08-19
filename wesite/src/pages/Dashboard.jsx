import DashboardTiles from "../components/Dashboard-tiles.jsx";
import { Alerts } from "../components/Stock-alerts.jsx";
import { Stats } from "../components/Stats.jsx";
import { ProductList } from "../components/ProductList.jsx";
import "../styles/dashboard.css";
import { Flex, Typography } from "antd";
import AnalyticsChart from "../components/charts/BarChart";
import { useInventory } from "../context/InventoryContext";

const { Title } = Typography;

export function Dashboard() {
  const { items } = useInventory();   // 🔥 consume context

  return (
    <main className="dashboard">
      <div className="dashboard-content">
        <Flex justify="space-between">
          <Flex vertical="vertical" gap={0}>
            <Title level={2}>Dashboard</Title>
            <Title level={4}>Overview of Your inventory management System</Title>
          </Flex>
        </Flex>
        <DashboardTiles items={items} />
        <Flex justify="space-between" gap={30}>
          <Alerts />
          <Stats items={items}/>
        </Flex>
        <ProductList items={items}/>
      </div>
    </main>
  );
}
