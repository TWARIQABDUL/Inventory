import React from 'react';
import DashboardTiles from "./Dashboard-tiles.jsx";
import {Alerts} from "./Stock-alerts.jsx";
import {Stats} from "./Stats.jsx";

export function Dashboard() {
  return (
    <main className="dashboard">
      <div className="dashboard-content">
        <div className="dashboard-title">
          <h1 className="dashboard-title">Dashboard</h1>
          <p>Overview of Your inventory management System</p>
        </div>
        <DashboardTiles/>
        <Alerts/>
        <Stats/>
      </div>
    </main>
  );
};