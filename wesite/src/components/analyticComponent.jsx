import { BarChart, Download, Grid3X3, List, RefreshCw, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { LoadingSpinner } from '../components/loadingspinner';
import FilterControls from '../components/filtercontrols';
import AnalyticsChart from '../components/charts/BarChart';
import { AnalyticsContext, AnalyticsProvider } from '../context/datacontext';
import { useContext } from 'react';
import MyTable from './tablecomponent';

function AnalyticsComponent() {
  const [loading, setLoading] = useState(true);
  const { dynData, Sortdata, filterd, refresh } = useContext(AnalyticsContext);
  // const data = [
  //   { name: 'Page ', uv: 400, pv: 2400, amt: 2700 },
  //   { name: 'Page B', uv: 300, pv: 2000, amt: 2210 },
  //   { name: 'Page C', uv: 800, pv: 9800, amt: 2290 },
  //   { name: 'Page D', uv: 278, pv: 3908, amt: 2000 },
  //   { name: 'Page D', uv: 278, pv: 3908, amt: 2000 },

  // ];

  console.log("I filtered", filterd);

  const [filters, setFilters] = useState({
    dateRange: {
      start: '2025-01-01',
      end: '2025-01-15',
      preset: 'last30days'
    },
    sortBy: 'revenue',
    sortOrder: 'desc',
    categories: [],
    regions: [],
    products: []
  });
  const [refreshing, setRefreshing] = useState(false);
  const { refrech } = useContext(AnalyticsContext);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      // refr();
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (newFilters) => {


    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleRefresh = async () => {
    refrech();
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleExport = () => {
    // Simulate export functionality
    const data = {
      filters,
      timestamp: new Date().toISOString(),
      type: 'analytics_report'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_report_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <div className="analytics-title-section">
          <h1 className="analytics-title">Analytics Dashboard</h1>
          <p className="analytics-subtitle">
            Comprehensive insights and performance metrics
          </p>
        </div>

        <div className="analytics-actions">
          <button
            className="btn btn-secondary"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw size={16} className={refreshing ? 'spinning' : ''} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>

          <button className="btn btn-secondary" onClick={handleExport}>
            <Download size={16} />
            Export Report
          </button>

          <FilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="analytics-content">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
          <div className="chart flex justify-between mb-4 gap-3">
              <AnalyticsChart data={filterd ?? dynData} />          
          </div>
            <MyTable />
        </div>
      </div>
    </div>
  );

}

export default AnalyticsComponent