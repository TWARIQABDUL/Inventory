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
  X
} from 'lucide-react';

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'sales', label: 'Sales', icon: TrendingUp },
  { id: 'purchases', label: 'Purchases', icon: ShoppingCart },
  { id: 'vendors', label: 'Vendors', icon: Users },
  { id: 'purchase-orders', label: 'Purchase Orders', icon: FileText },
  { id: 'purchase-received', label: 'Purchase Received', icon: CreditCard },
  { id: 'expenses', label: 'Expenses', icon: Receipt },
  { id: 'documents', label: 'Documents', icon: FolderOpen },
  { id: 'integrations', label: 'Integrations', icon: Zap },
  { id: 'report', label: 'Report', icon: BarChart3 },
  { id: 'customers', label: 'Customers', icon: UserCheck },
  { id: 'invoices', label: 'Invoices', icon: FileText },
  { id: 'help', label: 'Help', icon: HelpCircle },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <LayoutDashboard size={24} />
            </div>
            <span className="logo-text">FinanceFlow</span>
          </div>
          <button className="sidebar-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id} className={`nav-item ${item.active ? 'nav-item-active' : ''}`}>
                  <a href="#" className="nav-link">
                    <IconComponent size={18} className="nav-icon" />
                    <span className="nav-text">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;