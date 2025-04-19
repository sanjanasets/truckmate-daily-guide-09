import React from 'react';
import { Sun, TrendingUp, Package, Clock } from 'lucide-react';
import Header from '../components/Header';
import FoodCard from '../components/FoodCard';

const Menu: React.FC = () => {
  return (
    <div className="container mx-auto max-w-md p-4 pb-24">
      <Header greeting="What's cooking" name="in the kitchen?" />
      
      <div className="bg-truckmate-teal/10 p-4 rounded-xl mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Clock size={18} className="text-truckmate-teal" />
          <h3 className="font-medium text-truckmate-green">AI Menu Insights</h3>
        </div>
        <p className="text-sm text-truckmate-brown">
          Today's lunch crowd typically prefers spicy items. Consider featuring Mango Habanero Wings as your daily special.
        </p>
      </div>
      
      <div className="p-4 rounded-xl bg-white mb-6 shadow-sm">
        <h2 className="text-sm text-truckmate-brown mb-2">Current Conditions</h2>
        
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1 bg-truckmate-teal/10 text-truckmate-teal px-3 py-1 rounded-full">
            <Sun size={14} />
            <span>75°F, Sunny</span>
          </div>
          
          <div className="flex items-center gap-1 bg-truckmate-brown/10 text-truckmate-brown px-3 py-1 rounded-full">
            <TrendingUp size={14} />
            <span>High foot traffic</span>
          </div>
          
          <div className="flex items-center gap-1 bg-truckmate-gold/10 text-truckmate-gold px-3 py-1 rounded-full">
            <Package size={14} />
            <span>Full inventory</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-truckmate-green mb-3">Today's Menu</h2>
        
        <FoodCard 
          name="Chicken Tacos" 
          ingredients={["Grilled chicken", "Lime slaw", "Chipotle aioli"]} 
          servings={25} 
        />
        
        <FoodCard 
          name="Veggie Sliders" 
          ingredients={["Black bean patty", "Avocado", "Chipotle mayo"]} 
          servings={15} 
        />
        
        <FoodCard 
          name="Mango Habanero Wings" 
          ingredients={["Chicken wings", "Mango habanero sauce", "Blue cheese dip"]} 
          servings={20} 
        />
      </div>
    </div>
  );
};

export default Menu;
