import React from 'react';
import {BarChart, LayoutDashboard, Package, TrendingUp, X,} from 'lucide-react';
import {Link} from 'react-router-dom';
import {TransactionOutlined} from "@ant-design/icons";

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

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

            {/* ${item.active ? 'nav-item-active' : ''} */}
            <li className={`nav-item `}>
              <Link to="/" className="nav-link">
                <LayoutDashboard/>
                {/* <IconComponent size={18} className="nav-icon" /> */}
                <span className="nav-text">dashboard</span>
              </Link>
            </li>
            <li className={`nav-item `}>
              <Link to="/inventory" className="nav-link">
                <Package/>
                {/* <IconComponent size={18} className="nav-icon" /> */}
                <span className="nav-text">Inventory</span>
              </Link>
            </li>
            <li className={`nav-item `}>
              <Link to="/sales" className="nav-link">
                <TrendingUp/>
                {/* <IconComponent size={18} className="nav-icon" /> */}
                <span className="nav-text">Sales</span>

              </Link>
            </li>

            <li className={`nav-item `}>
              <Link to="/Transactions" className="nav-link">
                <TransactionOutlined/>
                {/* <IconComponent size={18} className="nav-icon" /> */}
                <span className="nav-text">Transactions</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;