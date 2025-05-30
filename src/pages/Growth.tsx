import React from 'react';
import { ArrowLeft, TrendingUp, Instagram, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import GrowthCard from '../components/GrowthCard';
import GrowthChart from '../components/GrowthChart';
import Header from '../components/Header';

const Growth: React.FC = () => {
  const weeklyData = [
    { day: 'Mon', sales: 450, customers: 32 },
    { day: 'Tue', sales: 420, customers: 28 },
    { day: 'Wed', sales: 580, customers: 40 },
    { day: 'Thu', sales: 520, customers: 36 },
    { day: 'Fri', sales: 720, customers: 52 },
    { day: 'Sat', sales: 850, customers: 65 },
    { day: 'Sun', sales: 690, customers: 48 },
  ];

  return (
    <div className="container mx-auto max-w-md p-4 pb-24">
      <Header greeting="Let's grow" name="your business!" />
      
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <ArrowLeft className="text-truckmate-green" />
        </Link>
        <h1 className="text-2xl font-bold text-truckmate-green">Growth Strategy</h1>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-truckmate-green mb-3">Today's Growth Ideas</h2>
        
        <GrowthCard 
          title="Trending Dish: Street Corn"
          content="Street corn is trending in your area. Consider adding it as a side to increase average order value."
          icon={TrendingUp}
        />
        
        <GrowthCard 
          title="Social Media Caption"
          content="'Beat the heat with our refreshing mango smoothies! Perfect companion for our spicy tacos 🔥🥭 #FoodTruckFriday #MangoPerfection'"
          icon={Instagram}
        />
        
        <GrowthCard 
          title="Recent Customer Feedback"
          content="'The veggie sliders were amazing! Would love to see more vegetarian options.' - Emily K. (Yesterday)"
          icon={MessageSquare}
          bgColor="bg-truckmate-teal/10"
        />
      </div>
      
      <GrowthChart data={weeklyData} />
      
      <button className="tm-button bg-truckmate-brown text-white w-full mt-4">
        Download Full Report
      </button>
    </div>
  );
};

export default Growth;
