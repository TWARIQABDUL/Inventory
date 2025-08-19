import React, { useContext, useState } from "react";
import { Calendar, Filter, X, ChevronDown } from "lucide-react";
import { AnalyticsContext } from "../context/datacontext";

const FilterControls = ({ filters, onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {Sortdata}= useContext(AnalyticsContext);

  const datePresets = [
    { value: "LAST_7_DAYS", label: "Last 7 days" },
    { value: "LAST_30_DAYS", label: "Last 30 days" },
    { value: "LAST_90_DAYS", label: "Last 90 days" },
    { value: "CUSTOM", label: "Custom range" },
  ];

  
  return (
    <div className="filter-controls">
      {/* Date Range Selector */}
      <div className="filter-group">
        <button
          className="filter-button date-filter"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          <Calendar size={16} />
          <span>Sort By Date</span>
          <ChevronDown size={14} className={showDatePicker ? "rotated" : ""} />
        </button>

        {showDatePicker && (
          <div className="date-picker-dropdown">
            <div className="date-presets">
              {datePresets.map((preset) => (
                <button
                  key={preset.value}
                  className={`date-preset`}
                  onClick={() =>{
                    Sortdata(preset.value)
                    setShowDatePicker(!showDatePicker)
                  }}
                >
                  {preset.label}
                  
                </button>
              ))}
            </div>
            {filters?.dateRange?.preset === "CUSTOM" && (
              <div className="custom-date-inputs">
                <div className="date-input-group">
                  <label>From:</label>
                  <input type="date" value={filters?.dateRange?.start || "hhh"} />
                </div>
                <div className="date-input-group">
                  <label>To:</label>
                  <input type="date" value={filters?.dateRange?.end || ""} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Advanced Filters */}
      <div className="filter-group">
        <button
          className="filter-button advanced-filter"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} />
          <span>Filters</span>
          <ChevronDown size={14} className={showFilters ? "rotated" : ""} />
        </button>

        {showFilters && (
          <div className="advanced-filters-dropdown">
            <div className="filter-section">
              <h4>Categories</h4>
              {/* categories list placeholder */}
            </div>

            <div className="filter-section">
              <h4>Regions</h4>
              {/* regions list placeholder */}
            </div>

            <div className="filter-actions">
              <button>Clear All</button>
              <button onClick={() => setShowFilters(false)}>Apply</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterControls;  