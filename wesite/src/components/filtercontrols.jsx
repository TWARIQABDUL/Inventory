import React, { useState } from "react";
import { Calendar, Filter, X, ChevronDown } from "lucide-react";

const FilterControls = ({ filters, onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Hardcoded date presets
  const datePresets = [
    { value: "LAST_7_DAYS", label: "Last 7 days" },
    { value: "LAST_30_DAYS", label: "Last 30 days" },
    { value: "LAST_90_DAYS", label: "Last 90 days" },
    { value: "CUSTOM", label: "Custom range" },
  ];

  const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books"];
  const regions = ["North America", "Europe", "Asia", "South America", "Africa", "Oceania"];

  const handleDatePresetChange = (preset) => {
    const today = new Date();
    let start, end;

    switch (preset) {
      case "LAST_7_DAYS":
        start = new Date(today.getTime() - 7 * 86400000);
        end = today;
        break;
      case "LAST_30_DAYS":
        start = new Date(today.getTime() - 30 * 86400000);
        end = today;
        break;
      case "LAST_90_DAYS":
        start = new Date(today.getTime() - 90 * 86400000);
        end = today;
        break;
      default:
        return;
    }

    onFilterChange({
      ...filters,
      dateRange: {
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
        preset,
      },
    });
    setShowDatePicker(false);
  };

  const handleCustomDateChange = (field, value) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value,
        preset: "CUSTOM",
      },
    });
  };

  const handleMultiSelectChange = (field, value) => {
    const currentValues = filters[field] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    onFilterChange({ ...filters, [field]: newValues });
  };

  const clearFilters = () => {
    onFilterChange({
      dateRange: { start: "2025-01-01", end: "2025-01-15", preset: "LAST_30_DAYS" },
      sortBy: "revenue",
      sortOrder: "desc",
      categories: [],
      regions: [],
      products: [],
    });
  };

  const getActiveFiltersCount = () =>
    (filters.categories?.length || 0) +
    (filters.regions?.length || 0) +
    (filters.products?.length || 0);

  const getCurrentDateLabel = () => {
    const preset = datePresets.find((p) => p.value === filters.dateRange.preset);
    return preset ? preset.label : "Custom range";
  };

  return (
    <div className="filter-controls">
      {/* Date Range Selector */}
      <div className="filter-group">
        <button
          className="filter-button date-filter"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          <Calendar size={16} />
          <span>{getCurrentDateLabel()}</span>
          <ChevronDown size={14} className={showDatePicker ? "rotated" : ""} />
        </button>

        {showDatePicker && (
          <div className="date-picker-dropdown">
            <div className="date-presets">
              {datePresets.map((preset) => (
                <button
                  key={preset.value}
                  className={`date-preset ${
                    filters.dateRange.preset === preset.value ? "active" : ""
                  }`}
                  onClick={() => handleDatePresetChange(preset.value)}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {filters.dateRange.preset === "CUSTOM" && (
              <div className="custom-date-inputs">
                <div className="date-input-group">
                  <label>From:</label>
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => handleCustomDateChange("start", e.target.value)}
                  />
                </div>
                <div className="date-input-group">
                  <label>To:</label>
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => handleCustomDateChange("end", e.target.value)}
                  />
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
          {getActiveFiltersCount() > 0 && (
            <span className="filter-badge">{getActiveFiltersCount()}</span>
          )}
          <ChevronDown size={14} className={showFilters ? "rotated" : ""} />
        </button>

        {showFilters && (
          <div className="advanced-filters-dropdown">
            <div className="filter-section">
              <h4>Categories</h4>
              {categories.map((category) => (
                <label key={category} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.categories?.includes(category) || false}
                    onChange={() => handleMultiSelectChange("categories", category)}
                  />
                  {category}
                </label>
              ))}
            </div>

            <div className="filter-section">
              <h4>Regions</h4>
              {regions.map((region) => (
                <label key={region} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.regions?.includes(region) || false}
                    onChange={() => handleMultiSelectChange("regions", region)}
                  />
                  {region}
                </label>
              ))}
            </div>

            <div className="filter-actions">
              <button onClick={clearFilters}>Clear All</button>
              <button onClick={() => setShowFilters(false)}>Apply</button>
            </div>
          </div>
        )}
      </div>

      {/* Clear Filters */}
      {getActiveFiltersCount() > 0 && (
        <button className="clear-filters-btn" onClick={clearFilters}>
          <X size={14} />
          Clear
        </button>
      )}
    </div>
  );
};

export default FilterControls;
