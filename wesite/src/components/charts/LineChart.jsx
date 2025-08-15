import React, { useState, useRef, useEffect } from 'react';
import { salesTrendData } from '../../../data/analyticsData';

const LineChart = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, data: null });
  const svgRef = useRef(null);

  const width = 800;
  const height = 300;
  const margin = { top: 20, right: 30, bottom: 40, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const maxValue = Math.max(...salesTrendData.map(d => d.value));
  const minValue = Math.min(...salesTrendData.map(d => d.value));
  const valueRange = maxValue - minValue;

  const xScale = (index) => (index / (salesTrendData.length - 1)) * chartWidth;
  const yScale = (value) => chartHeight - ((value - minValue) / valueRange) * chartHeight;

  const pathData = salesTrendData
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d.value)}`)
    .join(' ');

  const handleMouseMove = (event, point, index) => {
    const rect = svgRef.current.getBoundingClientRect();
    setTooltip({
      show: true,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      data: point
    });
    setHoveredPoint(index);
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, data: null });
    setHoveredPoint(null);
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
    <div className="line-chart-container">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="line-chart"
        viewBox={`0 0 ${width} ${height}`}
      >
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width={chartWidth} height={chartHeight} x={margin.left} y={margin.top} fill="url(#grid)" />

        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const value = minValue + (valueRange * ratio);
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

        {/* X-axis labels */}
        {salesTrendData.map((d, i) => {
          if (i % 3 === 0) {
            return (
              <text
                key={i}
                x={margin.left + xScale(i)}
                y={height - 10}
                textAnchor="middle"
                className="chart-axis-label"
              >
                {d.label}
              </text>
            );
          }
          return null;
        })}

        {/* Line path */}
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <path
            d={pathData}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="3"
            className="line-path"
          />

          {/* Data points */}
          {salesTrendData.map((point, index) => (
            <circle
              key={index}
              cx={xScale(index)}
              cy={yScale(point.value)}
              r={hoveredPoint === index ? 6 : 4}
              fill="var(--color-primary)"
              stroke="white"
              strokeWidth="2"
              className="data-point"
              onMouseMove={(e) => handleMouseMove(e, point, index)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip.show && tooltip.data && (
        <div
          className="chart-tooltip"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 10
          }}
        >
          <div className="tooltip-date">{tooltip.data.label}</div>
          <div className="tooltip-value">{formatValue(tooltip.data.value)}</div>
        </div>
      )}
    </div>
  );
};

export default LineChart;