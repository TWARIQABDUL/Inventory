import React, { useState, useEffect } from "react";
import { Package, DollarSign, AlertTriangle } from "lucide-react";
import "../styles/dashboard.css";

export function DashboardTile({titleName, titleIcon, tileBody, tileFooter, iconColor}) {
  return (
    <div className="dashboard-tile">
      <div className="tile-header">
        <div className="tile-title">
          <h1>{titleName}</h1>
        </div>
        <div className="title-icon">{React.createElement(titleIcon, { size: 24, color: iconColor })}</div>
      </div>
      <div className="tile-body">{tileBody}</div>
      <div className="tile-footer">{tileFooter}</div>
    </div>
  );
}

export default function DashboardTiles() {
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const fetchedData = [
        {
          titleName: "Total Items",
          titleIcon: Package,
          tileBody: "12",
          tileFooter: "+0 items added this week",
        },
        {
          titleName: "Total Value",
          titleIcon: DollarSign,
          tileBody: "$31,771.1",
          tileFooter: "Inventory worth",
        },
        {
          titleName: "Low Stock",
          titleIcon: AlertTriangle,
          tileBody: "2",
          tileFooter: "Items need restocking",
          iconColor: "#ffcc00",
        },
        {
          titleName: "Out of Stock",
          titleIcon: AlertTriangle,
          tileBody: "2",
          tileFooter: "Items Unavailable",
          iconColor: "#ff0000",
        },
      ];
      setTiles(fetchedData);
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="dashboard-tiles">
      {loading && <div className="spinner"></div>}
      {tiles.map((tile) => (
        <DashboardTile
          key={tile.titleName}
          titleName={tile.titleName}
          titleIcon={tile.titleIcon}
          tileBody={tile.tileBody}
          tileFooter={tile.tileFooter}
          iconColor={tile.iconColor}
          loading={loading}
        />
      ))}
    </div>
  );
}
