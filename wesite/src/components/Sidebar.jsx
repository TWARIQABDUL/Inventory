import React from 'react';
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  ShoppingCart,
  Users,
  FileText,
  CreditCard,
  Receipt,
  FolderOpen,
  Zap,
  BarChart3,
  UserCheck,
  HelpCircle,
  Settings,
  X,
  BarChart,
} from 'lucide-react';
import {Link} from 'react-router-dom';

const Sidebar = ({isOpen, onClose}) => {
  return (
    <>
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <LayoutDashboard size={24}/>
            </div>
            <span className="logo-text">INVENTORY</span>
          </div>
          <button className="sidebar-close" onClick={onClose}>
            <X size={20}/>
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navigationItems.slice(0, 4).map(item => (
              <li key={item.id} className="nav-item">
                <Link to={item.id === 'dashboard' ? '/' : `/${item.id}`} className="nav-link">
                  <item.icon size={18}/>
                  <span className="nav-text">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;