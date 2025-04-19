
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, MapPin, BarChart, Package } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return (location.pathname === path || (path === '/' && location.pathname === '/')) 
      ? 'text-truckmate-teal' 
      : 'text-truckmate-brown';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] p-2">
      <div className="container mx-auto max-w-md">
        <div className="flex justify-around items-center">
          <Link to="/" className={`flex flex-col items-center p-2 ${isActive('/')}`}>
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/location" className={`flex flex-col items-center p-2 ${isActive('/location')}`}>
            <MapPin size={24} />
            <span className="text-xs mt-1">Location</span>
          </Link>
          <Link to="/inventory" className={`flex flex-col items-center p-2 ${isActive('/inventory')}`}>
            <Package size={24} />
            <span className="text-xs mt-1">Inventory</span>
          </Link>
          <Link to="/growth" className={`flex flex-col items-center p-2 ${isActive('/growth')}`}>
            <BarChart size={24} />
            <span className="text-xs mt-1">Growth</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
