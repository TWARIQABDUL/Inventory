import { BarChart, Download, Grid3X3, List, RefreshCw, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { LoadingSpinner } from '../components/loadingspinner';
import FilterControls from '../components/filtercontrols';
import AnalyticsChart from '../components/charts/BarChart';
import {AnalyticsProvider } from '../context/datacontext';
import { useContext } from 'react';
import AnalyticsComponent from '../components/analyticComponent';

function Analytics() {
  const [loading, setLoading] = useState(true);
  // const test = useContext(AnalyticsContext);
  const data = [
    { name: 'Page ', uv: 400, pv: 2400, amt: 2700 },
    { name: 'Page B', uv: 300, pv: 2000, amt: 2210 },
    { name: 'Page C', uv: 800, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 278, pv: 3908, amt: 2000 },
    { name: 'Page D', uv: 278, pv: 3908, amt: 2000 },
  
  ];
  
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

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleRefresh = async () => {
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
    <AnalyticsProvider>
    <AnalyticsComponent/>
    </AnalyticsProvider>
  );

}

export default Analytics