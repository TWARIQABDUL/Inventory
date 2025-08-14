import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout';
import {Dashboard} from './pages/Dashboard';
import './styles/global.css';
import './styles/analytics.css';

// import Home from './components/home';
import Inventory from './pages/inventory';
import Sales from './pages/sales';
import Purchase from './pages/purchase';
import Analytics from './pages/analytics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wraps all main pages */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path='/inventory' element ={<Inventory/>}/>
          <Route path='/sales' element ={<Sales/>}/>
          <Route path='/purchase' element ={<Purchase/>}/>
          <Route path='/analytics' element ={<Analytics/>}/>

          {/* <Route path='/home' element ={<Home/>}/> */}
          {/* Add more pages here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
