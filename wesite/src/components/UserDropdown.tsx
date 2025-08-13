import React from 'react';
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';

interface UserDropdownProps {
  onClose: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onClose }) => {
  return (
    <div className="user-dropdown">
      <div className="dropdown-header">
        <img 
          src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop&crop=face"
          alt="Sarah Johnson" 
          className="dropdown-avatar"
        />
        <div className="dropdown-user-info">
          <div className="dropdown-user-name">Sarah Johnson</div>
          <div className="dropdown-user-email">sarah@company.com</div>
        </div>
      </div>
      
      <div className="dropdown-divider"></div>
      
      <nav className="dropdown-nav">
        <a href="#" className="dropdown-item">
          <User size={16} />
          <span>Profile</span>
        </a>
        <a href="#" className="dropdown-item">
          <Settings size={16} />
          <span>Settings</span>
        </a>
        <a href="#" className="dropdown-item">
          <HelpCircle size={16} />
          <span>Help & Support</span>
        </a>
      </nav>
      
      <div className="dropdown-divider"></div>
      
      <a href="#" className="dropdown-item dropdown-logout">
        <LogOut size={16} />
        <span>Sign out</span>
      </a>
    </div>
  );
};

export default UserDropdown;