import React from 'react';
import cube from '../assets/images/cube.png';
import dollar from '../assets/images/dollar.png';
import warningRed from '../assets/images/warning-red.png';
import warningYellow from '../assets/images/warning-yellow.png';
import {Alerts} from "./Stock-alerts.jsx";


export const dashBoardData = [
  {titleName: 'Total Items', titleIcon: cube, tileBody: '12', tileFooter: '+0 items added this week'},
  {titleName: 'Total Value', titleIcon: dollar, tileBody: '$31,771.1', tileFooter: 'Inventory worth'},
  {titleName: 'Low Stock', titleIcon: warningRed, tileBody: '2', tileFooter: 'Items need restocking'},
  {titleName: 'Out of Stock', titleIcon: warningYellow, tileBody: '2', tileFooter: 'Items Unavailable'}
];

export function DashboardTile({titleName, titleIcon, tileBody, tileFooter}) {
  return (
    <div className="dashboard-tile">
      <div className="tile-header">
        <div className="tile-title">
          <h1>{titleName}</h1>
        </div>
        <div className="title-icon">
          <img className="tile-icon" src={titleIcon} alt="tile-icon"/>
        </div>
      </div>
      <div className="tile-body">
        {tileBody}
      </div>
      <div className="tile-footer">
        {tileFooter}
      </div>
    </div>
  );
}

export default function DashboardTiles() {
  return (
    <div className="dashboard-tiles">
        {
          dashBoardData.map((tile) => (
            <DashboardTile
              key={tile.titleName}
              titleName={tile.titleName}
              titleIcon={tile.titleIcon}
              tileBody={tile.tileBody}
              tileFooter={tile.tileFooter}
            />
          ))
        }
    </div>
  );
}