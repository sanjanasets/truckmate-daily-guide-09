
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  content: string;
  icon: LucideIcon;
  iconBgColor: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, content, icon: Icon, iconBgColor }) => {
  return (
    <div className="tm-card mb-4">
      <div className="flex items-start gap-3 mb-2">
        <div className={`tm-icon-circle ${iconBgColor} flex-shrink-0`}>
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm text-truckmate-brown font-medium">{title}</h3>
          <p className="text-truckmate-green font-medium">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
