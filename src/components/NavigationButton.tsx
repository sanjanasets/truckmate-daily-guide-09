
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavigationButtonProps {
  title: string;
  icon: LucideIcon;
  path: string;
  color: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ title, icon: Icon, path, color }) => {
  return (
    <Link to={path} className={`tm-navigation-button bg-white hover:shadow-md`}>
      <div className={`tm-icon-circle ${color}`}>
        <Icon size={20} />
      </div>
      <span className="text-sm font-medium text-truckmate-green">{title}</span>
    </Link>
  );
};

export default NavigationButton;
