import { Download, Grid3X3, List, RefreshCw, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { LoadingSpinner } from '../components/loadingspinner';
import FilterControls from '../components/filtercontrols';

function Analytics() {
    const [loading, setLoading] = useState(true);
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
        {/* <KPISection filters={filters} />
        <ChartsSection filters={filters} />
        <UserInsights filters={filters} />
        <ProductPerformance filters={filters} /> */}
      </div>
    </div>
  );

}

export default Analytics