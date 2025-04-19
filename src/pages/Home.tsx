
import React from 'react';
import Header from '../components/Header';
import SummaryCard from '../components/SummaryCard';
import NavigationButton from '../components/NavigationButton';
import { MapPin, ChefHat, BarChart, Droplets } from 'lucide-react';

const Home: React.FC = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <Header greeting={getGreeting()} name="Chef Jojo!" />
      
      <div className="mb-6">
        <SummaryCard 
          title="Today's Location" 
          content="5th & Pine – Farmers Market" 
          icon={MapPin} 
          iconBgColor="bg-truckmate-teal" 
        />
        
        <SummaryCard 
          title="Menu Suggestion" 
          content="Extra chicken tacos" 
          icon={ChefHat} 
          iconBgColor="bg-truckmate-gold" 
        />
        
        <SummaryCard 
          title="Growth Idea" 
          content="Post about your veggie sliders today!" 
          icon={BarChart} 
          iconBgColor="bg-truckmate-brown" 
        />
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <NavigationButton 
          title="Where to Park?" 
          icon={MapPin} 
          path="/location" 
          color="bg-truckmate-teal"
        />
        
        <NavigationButton 
          title="What to Cook?" 
          icon={ChefHat} 
          path="/menu" 
          color="bg-truckmate-gold"
        />
        
        <NavigationButton 
          title="Growth Strategy" 
          icon={BarChart} 
          path="/growth" 
          color="bg-truckmate-brown"
        />
      </div>
      
      <div className="p-4 bg-white rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Droplets size={18} className="text-truckmate-teal" />
          <h3 className="text-sm font-medium text-truckmate-green">AI Insight</h3>
        </div>
        <p className="text-sm text-truckmate-brown">
          Based on today's forecast (sunny, 75°F) and location, you might sell 15% more beverages than usual. Consider stocking up!
        </p>
      </div>
    </div>
  );
};

export default Home;
