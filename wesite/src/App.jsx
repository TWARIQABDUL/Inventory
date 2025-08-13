import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

import './styles/global.css';
import Dashboard from './components/Dashboard';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState();
  const [currentView, setCurrentView] = useState('grid');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleViewChange = () => {
    setCurrentView(view);
  };

  return (
    <div className="app">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <Header 
          onMenuClick={toggleSidebar}
        />
        <Dashboard/>
      </div>
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}

export default App;