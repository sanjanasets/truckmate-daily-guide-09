
import React from 'react';

const MapView: React.FC = () => {
  return (
    <div className="relative w-full h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-truckmate-brown">Interactive Map Placeholder</p>
      </div>
      {/* In a real implementation, we would integrate with a mapping service like Google Maps or Mapbox */}
      <div className="absolute bottom-2 right-2 bg-white p-2 rounded-lg shadow-md">
        <div className="flex gap-2 items-center">
          <div className="h-3 w-3 rounded-full bg-truckmate-teal"></div>
          <span className="text-xs">Current Location</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-3 w-3 rounded-full bg-truckmate-gold"></div>
          <span className="text-xs">Suggested Spots</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
