import React, { useContext } from 'react';
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';
import user from '../assets/images/user.png'
import { UserContext } from '../context/userContext';

const UserDropdown = ({ onClose,userInfo }) => {
  const {logout }= useContext(UserContext)
  // console.log(logout,"kkkk");
  
  return (
    <div className="user-dropdown">
      <div className="dropdown-header">
        <img 
          src={user}
          alt="Sarah Johnson" 
          className="dropdown-avatar"
        />
        <div className="dropdown-user-info">
          <div className="dropdown-user-name">{userInfo.name}</div>
          <div className="dropdown-user-email">{userInfo.email}</div>
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
      
      <a className="dropdown-item dropdown-logout" >
        <LogOut size={16} />
        <span className='cursor-pointer' onClick={logout} >Sign out</span>
      </a>
    </div>
  );
};

export default UserDropdown;