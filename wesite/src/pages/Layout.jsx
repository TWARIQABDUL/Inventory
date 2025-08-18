import React, { useContext, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import '../styles/global.css';
import { UserContextProvider } from '../context/userContext';
import { UserContext } from '../context/userContext'; 
function Layout() {
   const { user } = useContext(UserContext);  
  console.log("Logged in user:", user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const user = useContext(UserContextProvider)
  // console.log(user);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (user) {
    
  return(
    // <UserContextProvider>
    <div className="app">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main-content">
        <Header onMenuClick={toggleSidebar} />
        <Outlet />
      </div>

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )}
}

export default Layout;
