
import React from 'react';
import { Clock } from 'lucide-react';
import LocationCard from '../components/LocationCard';
import MapView from '../components/MapView';
import Header from '../components/Header';

const Location: React.FC = () => {
  return (
    <div className="container mx-auto max-w-md p-4 pb-24">
      <Header greeting="Location" name="Insights" />
      
      <div className="bg-truckmate-teal/10 p-4 rounded-xl mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock size={18} className="text-truckmate-teal" />
          <h3 className="font-medium text-truckmate-green">AI Location Insights</h3>
        </div>
        <p className="text-sm text-truckmate-brown">
          Based on current traffic and events, Farmers Market (5th & Pine) shows highest potential. Expected peak: 12 PM - 2 PM.
        </p>
      </div>
      
      <MapView />
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-truckmate-green mb-2">Recommended Spots</h2>
        
        <LocationCard 
          name="Farmers Market" 
          address="5th & Pine St" 
          peakHours="11:00 AM - 2:00 PM" 
          isLoyaltyHotspot={true} 
        />
        
        <LocationCard 
          name="Tech District" 
          address="10th & Madison Ave" 
          peakHours="12:00 PM - 3:00 PM" 
          isLoyaltyHotspot={false} 
        />
        
        <LocationCard 
          name="Riverside Park" 
          address="Riverside Dr & 8th" 
          peakHours="5:00 PM - 8:00 PM" 
          isLoyaltyHotspot={false}
          weatherWarning="Potential light rain around 6 PM" 
        />
      </div>
    </div>
  );
};

export default Location;
