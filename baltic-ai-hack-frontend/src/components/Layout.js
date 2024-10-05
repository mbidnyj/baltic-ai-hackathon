import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Import the Header component

const Layout = () => {
  return (
    <div>
      {/* Header */}
      <Header userType="teacher" /> {/* You can pass userType as a prop here */}
      
      {/* Main Content */}
      <main className="px-8 py-12 bg-gray-50 min-h-screen">
        <Outlet /> {/* This renders the routed content */}
      </main>
    </div>
  );
};

export default Layout;
