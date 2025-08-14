import React, { useState } from 'react';
import { Search, Menu, Grid3X3, List, Bell, ChevronDown } from 'lucide-react';
import UserDropdown from './UserDropdown';
import user from '../assets/images/user.png'


const Header = ({ onMenuClick, currentView, onViewChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        <h1 className="greeting">Hello, Jeffery</h1>
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
              src={user}
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