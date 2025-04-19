
import React from 'react';
import Header from '../components/Header';
import SummaryCard from '../components/SummaryCard';
import { MapPin, ChefHat, BarChart, Clock, Package } from 'lucide-react';

const Home: React.FC = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="container mx-auto max-w-md p-4 pb-24">
      <Header greeting={getGreeting()} name="Chef Jojo!" />
      
      <div className="mb-6">
        <SummaryCard 
          title="Current Location" 
          content="5th & Pine – Farmers Market" 
          icon={MapPin} 
          iconBgColor="bg-truckmate-teal" 
        />
        
        <div className="bg-truckmate-teal/10 p-4 rounded-xl mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={18} className="text-truckmate-teal" />
            <h3 className="font-medium text-truckmate-green">Peak Hours Insight</h3>
          </div>
          <p className="text-sm text-truckmate-brown">
            Current time suggests high foot traffic. Average wait time: 12 mins. Consider opening second service window.
          </p>
        </div>
        
        <SummaryCard 
          title="Inventory Alert" 
          content="Low on: Chicken, Avocados" 
          icon={Package} 
          iconBgColor="bg-truckmate-gold" 
        />
        
        <SummaryCard 
          title="Today's Performance" 
          content="+15% sales vs last Tuesday" 
          icon={BarChart} 
          iconBgColor="bg-truckmate-brown" 
        />
      </div>
      
      <div className="p-4 bg-white rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <ChefHat size={18} className="text-truckmate-teal" />
          <h3 className="text-sm font-medium text-truckmate-green">AI Recommendation</h3>
        </div>
        <p className="text-sm text-truckmate-brown">
          Based on current weather (75°F, Sunny) and location, consider featuring your Mango Habanero Wings. Historical data shows 20% higher sales of spicy items on warm days.
        </p>
      </div>
    </div>
  );
};

export default Home;
