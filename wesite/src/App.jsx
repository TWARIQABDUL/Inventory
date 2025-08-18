import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import { Dashboard } from './pages/Dashboard.jsx';
import './styles/global.css';
import './styles/analytics.css';

import Inventory from './pages/inventory';
import Sales from './pages/sales';
import Purchase from './pages/purchase';
import Analytics from './pages/analytics';
import LoginPage from './pages/login';
import Register from './pages/register.jsx';
import { UserContextProvider } from './context/userContext.jsx';

function App() {
  return (
    <BrowserRouter>
      {/* 👇 Wrap ALL routes inside UserContextProvider */}
      <UserContextProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/analytics" element={<Analytics />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
