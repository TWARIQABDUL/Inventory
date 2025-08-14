import React from 'react';
import DashboardTiles from "../components/Dashboard-tiles.jsx";
import {Alerts} from "../components/Stock-alerts.jsx";
import {Stats} from "../components/Stats.jsx";
import {ProductList} from "../components/ProductList.jsx";
import '../styles/dashboard.css'
import {Button} from "../components/button.jsx";

export function Dashboard() {
  return (
    <main className="dashboard">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Overview of Your inventory management System</p>
          </div>
          <Button button_value="Add +" button_color="btn-primary" onClick={() => {}}/>
        </div>
        <DashboardTiles/>
        <div className="section-2">
          <Alerts/>
          <Stats/>
        </div>
        <ProductList/>
      </div>
    </main>
  );
}