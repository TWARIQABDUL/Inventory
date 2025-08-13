import React, { useState } from 'react';
import { monthlyComparisonData } from '../../../data/analyticsData';

const BarChart = () => {
  const [hoveredBar, setHoveredBar] = useState(null);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, data: null });

  const width = 800;
  const height = 300;
  const margin = { top: 20, right: 30, bottom: 40, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const maxValue = Math.max(
    ...monthlyComparisonData.flatMap(d => [d.current, d.previous])
  );
  const barWidth = chartWidth / (monthlyComparisonData.length * 2.5);
  const groupWidth = barWidth * 2.2;

  const yScale = (value) => (value / maxValue) * chartHeight;

  const handleMouseEnter = (event, data, type) => {
    setTooltip({
      show: true,
      x: event.clientX,
      y: event.clientY,
      data: { ...data, type }
    });
    setHoveredBar(`${data.label}-${type}`);
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, data: null });
    setHoveredBar(null);
  };

  const formatValue = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bar-chart-container">
      <svg
        width={width}
        height={height}
        className="bar-chart"
        viewBox={`0 0 ${width} ${height}`}
      >
        {/* Y-axis labels and grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const value = maxValue * ratio;
          const y = margin.top + chartHeight - (ratio * chartHeight);
          return (
            <g key={ratio}>
              <text
                x={margin.left - 10}
                y={y + 4}
                textAnchor="end"
                className="chart-axis-label"
              >
                {formatValue(value)}
              </text>
              <line
                x1={margin.left}
                y1={y}
                x2={margin.left + chartWidth}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
                opacity="0.5"
              />
            </g>
          );
        })}

        {/* Bars */}
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {monthlyComparisonData.map((data, index) => {
            const groupX = (index * chartWidth) / monthlyComparisonData.length;
            const currentBarHeight = yScale(data.current);
            const previousBarHeight = yScale(data.previous);

            return (
              <g key={data.label}>
                {/* Previous period bar */}
                <rect
                  x={groupX + (groupWidth - barWidth * 2) / 2}
                  y={chartHeight - previousBarHeight}
                  width={barWidth}
                  height={previousBarHeight}
                  fill={hoveredBar === `${data.label}-previous` ? '#94a3b8' : '#cbd5e1'}
                  className="bar-previous"
                  onMouseEnter={(e) => handleMouseEnter(e, data, 'previous')}
                  onMouseLeave={handleMouseLeave}
                />

                {/* Current period bar */}
                <rect
                  x={groupX + (groupWidth - barWidth * 2) / 2 + barWidth + 4}
                  y={chartHeight - currentBarHeight}
                  width={barWidth}
                  height={currentBarHeight}
                  fill={hoveredBar === `${data.label}-current` ? 'var(--color-primary-dark)' : 'var(--color-primary)'}
                  className="bar-current"
                  onMouseEnter={(e) => handleMouseEnter(e, data, 'current')}
                  onMouseLeave={handleMouseLeave}
                />

                {/* X-axis label */}
                <text
                  x={groupX + groupWidth / 2}
                  y={chartHeight + 25}
                  textAnchor="middle"
                  className="chart-axis-label"
                >
                  {data.label}
                </text>
              </g>
            );
          })}
        </g>

        {/* Legend */}
        <g transform={`translate(${width - 150}, 30)`}>
          <rect x="0" y="0" width="12" height="12" fill="var(--color-primary)" />
          <text x="18" y="10" className="chart-legend-text">Current Period</text>
          <rect x="0" y="20" width="12" height="12" fill="#cbd5e1" />
          <text x="18" y="30" className="chart-legend-text">Previous Period</text>
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip.show && tooltip.data && (
        <div
          className="chart-tooltip"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 10,
            position: 'fixed',
            zIndex: 1000
          }}
        >
          <div className="tooltip-date">{tooltip.data.label}</div>
          <div className="tooltip-value">
            {tooltip.data.type === 'current' ? 'Current: ' : 'Previous: '}
            {formatValue(tooltip.data[tooltip.data.type])}
          </div>
        </div>
      )}
    </div>
  );
};

export default BarChart;