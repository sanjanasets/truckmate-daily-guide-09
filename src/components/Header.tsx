
import React from 'react';
import { Bell } from 'lucide-react';

interface HeaderProps {
  greeting: string;
  name: string;
}

const Header: React.FC<HeaderProps> = ({ greeting, name }) => {
  return (
    <div className="flex justify-between items-center mb-6 px-1">
      <div>
        <h2 className="text-lg text-truckmate-brown">{greeting}</h2>
        <h1 className="text-2xl font-bold text-truckmate-green">{name}</h1>
      </div>
      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
        <Bell size={20} className="text-truckmate-green" />
      </button>
    </div>
  );
};

export default Header;
