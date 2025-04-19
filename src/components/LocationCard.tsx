
import React from 'react';
import { Clock } from 'lucide-react';

interface LocationCardProps {
  name: string;
  address: string;
  peakHours: string;
  isLoyaltyHotspot: boolean;
  weatherWarning?: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  name,
  address,
  peakHours,
  isLoyaltyHotspot,
  weatherWarning,
}) => {
  return (
    <div className="tm-card mb-4 relative">
      {isLoyaltyHotspot && (
        <div className="absolute -top-1 -right-1 bg-truckmate-gold text-white text-xs px-2 py-1 rounded-full">
          Loyalty Hotspot
        </div>
      )}
      <h3 className="font-bold text-truckmate-green">{name}</h3>
      <p className="text-sm text-truckmate-brown mb-2">{address}</p>
      
      <div className="flex items-center gap-1 text-xs text-truckmate-brown">
        <Clock size={14} />
        <span>Peak hours: {peakHours}</span>
      </div>
      
      {weatherWarning && (
        <div className="mt-2 text-xs bg-red-100 text-red-600 p-2 rounded-lg">
          {weatherWarning}
        </div>
      )}
    </div>
  );
};

export default LocationCard;
