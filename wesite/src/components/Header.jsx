import React, { useState } from 'react';
import { Search, Menu, Grid3X3, List, Bell, ChevronDown } from 'lucide-react';
import UserDropdown from './UserDropdown';


const Header = ({ onMenuClick, currentView, onViewChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        <h1 className="greeting">Hello, Jeff</h1>
      </div>

      <div className="header-center">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search transactions, vendors..."
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        <div className="view-toggle">
          <button 
            className={`view-button ${currentView === 'grid' ? 'view-button-active' : ''}`}
            onClick={() => onViewChange('grid')}
          >
            <Grid3X3 size={16} />
          </button>
          <button 
            className={`view-button ${currentView === 'list' ? 'view-button-active' : ''}`}
            onClick={() => onViewChange('list')}
          >
            <List size={16} />
          </button>
        </div>

        <div className="notification-container">
          <button className="notification-button">
            <Bell size={18} />
            <span className="notification-badge">3</span>
          </button>
        </div>

        <div className="user-container">
          <button 
            className="user-button" 
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img 
              src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop&crop=face" 
              alt="Sarah Johnson" 
              className="user-avatar"
            />
            <span className="user-name">Sarah Johnson</span>
            <ChevronDown size={16} className={`dropdown-arrow ${dropdownOpen ? 'dropdown-arrow-open' : ''}`} />
          </button>
          
          {dropdownOpen && (
            <UserDropdown onClose={() => setDropdownOpen(false)} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;