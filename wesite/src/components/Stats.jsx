import React from "react";

export const statsList = [
  {statName: "Total Products:", statValue: "1,234"},
  {statName: "Low Stock Items:", statValue: "15"},
  {statName: "Out of Stock:", statValue: "3"},
  {statName: "Total Asset Value:", statValue: "8"}
]

function StatsList({statName, statValue}){
  return(
    <>
      <div className="stats-list">
        <div className="stats-item">
          <h2>{statName}</h2>
          <p>{statValue}</p>
        </div>
      </div>
    </>
  );
}

export function Stats() {
  return(
    <>
      <div className='inventory-stats'>
        <div className='stats-title'>
          <img src="../assets/images/graph.png" alt="stats-icon"/>
          <h1>Quick Stats</h1>
        </div>
        <div className="stats-container">
          {statsList.map((stat) => (
            <StatsList key={stat.statName} statName={stat.statName} statValue={stat.statValue}/>
          ))}
        </div>
      </div>
    </>
  );
}