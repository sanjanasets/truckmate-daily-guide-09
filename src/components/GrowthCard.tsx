
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GrowthCardProps {
  title: string;
  content: string;
  icon?: LucideIcon;
  bgColor?: string;
}

const GrowthCard: React.FC<GrowthCardProps> = ({ 
  title, 
  content, 
  icon: Icon, 
  bgColor = "bg-white" 
}) => {
  return (
    <div className={`tm-card mb-4 ${bgColor}`}>
      <div className="flex items-start gap-2">
        {Icon && (
          <div className="w-8 h-8 rounded-full bg-truckmate-brown/10 flex items-center justify-center flex-shrink-0">
            <Icon size={16} className="text-truckmate-brown" />
          </div>
        )}
        <div>
          <h3 className="font-bold text-truckmate-green mb-1">{title}</h3>
          <p className="text-sm text-truckmate-brown">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default GrowthCard;
