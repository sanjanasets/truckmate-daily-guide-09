
import React from 'react';
import { ArrowLeft, Sun, TrendingUp, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';

const Menu: React.FC = () => {
  return (
    <div className="container mx-auto max-w-md p-4">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <ArrowLeft className="text-truckmate-green" />
        </Link>
        <h1 className="text-2xl font-bold text-truckmate-green">What to Cook?</h1>
      </div>
      
      <div className="p-4 rounded-xl bg-white mb-6 shadow-sm">
        <h2 className="text-sm text-truckmate-brown mb-2">AI Recommendation</h2>
        <p className="text-truckmate-green mb-3">
          Based on today's data, here's what might sell well:
        </p>
        
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1 bg-truckmate-teal/10 text-truckmate-teal px-3 py-1 rounded-full">
            <Sun size={14} />
            <span>Warm weather</span>
          </div>
          
          <div className="flex items-center gap-1 bg-truckmate-brown/10 text-truckmate-brown px-3 py-1 rounded-full">
            <TrendingUp size={14} />
            <span>Past sales data</span>
          </div>
          
          <div className="flex items-center gap-1 bg-truckmate-gold/10 text-truckmate-gold px-3 py-1 rounded-full">
            <Package size={14} />
            <span>Current inventory</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-truckmate-green mb-3">Featured Menu Items</h2>
        
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
      
      <div className="grid grid-cols-2 gap-4">
        <button className="tm-button bg-white text-truckmate-brown border border-truckmate-brown">
          Add to Shopping List
        </button>
        <button className="tm-button bg-truckmate-gold text-white">
          Confirm Menu
        </button>
      </div>
    </div>
  );
};

export default Menu;
