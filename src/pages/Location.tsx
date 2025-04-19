
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import LocationCard from '../components/LocationCard';
import MapView from '../components/MapView';

const Location: React.FC = () => {
  return (
    <div className="container mx-auto max-w-md p-4">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <ArrowLeft className="text-truckmate-green" />
        </Link>
        <h1 className="text-2xl font-bold text-truckmate-green">Where to Park?</h1>
      </div>
      
      <MapView />
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-truckmate-green mb-2">Today's Top Locations</h2>
        
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
      
      <div className="grid grid-cols-2 gap-4">
        <button className="tm-button bg-white text-truckmate-brown border border-truckmate-brown">
          See More
        </button>
        <button className="tm-button bg-truckmate-teal">
          Confirm Location
        </button>
      </div>
    </div>
  );
};

export default Location;
