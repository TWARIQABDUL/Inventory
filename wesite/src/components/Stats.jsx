import React, {useEffect, useState} from "react";
import stats from "../assets/images/graph.png";
import "../styles/dashboard.css";

export const statsList = [
  { statName: "Total Products:", statValue: "1,234" },
  { statName: "Low Stock Items:", statValue: "15" },
  { statName: "Out of Stock:", statValue: "3" },
  { statName: "Total Asset Value:", statValue: "8" },
];

function StatsList({ statName, statValue }) {
  return (
    <>
      <div className="stats-item">
        <h2>{statName}</h2>
        <p>{statValue}</p>
      </div>
    </>
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
    <>
      <div className="inventory-stats">
        <div className="stats-title">
          <img src={stats} alt="stats-icon" className="stats-icon" />
          <h1>Quick Stats</h1>
        </div>
        {loading && <div className="spinner"></div>}
        <div className="stats-container">
          {statsList.map((stat) => (
            <StatsList
              key={stat.statName}
              statName={stat.statName}
              statValue={stat.statValue}
            />
          ))}
        </div>
      </div>
    </>
  );
}
