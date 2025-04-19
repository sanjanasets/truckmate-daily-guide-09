import React, { useState } from 'react';
import { Package, AlertTriangle, Brain, Clock, Sparkles, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import InventoryItem from '../components/InventoryItem';
import InventoryInsights from '../components/InventoryInsights';

// For demo purposes, we'll use this data
// In a real app, this would come from a backend
const initialInventory = [
  {
    id: 1, 
    name: 'Tortillas', 
    quantity: 150, 
    unit: 'pieces', 
    category: 'Bread',
    expiryDate: '2025-04-25',
    minThreshold: 50,
    aiInsight: 'Usage trending 20% higher than usual. Consider ordering early.',
    predictedRunout: '2025-04-24',
    salesVelocity: 'High'
  },
  {
    id: 2, 
    name: 'Ground Beef', 
    quantity: 4.5, 
    unit: 'lbs', 
    category: 'Meat',
    expiryDate: '2025-04-22',
    minThreshold: 5, 
    aiInsight: 'Critical! Will run out before next delivery window.',
    predictedRunout: '2025-04-20',
    salesVelocity: 'Very High'
  },
  {
    id: 3, 
    name: 'Cheese', 
    quantity: 8, 
    unit: 'lbs', 
    category: 'Dairy',
    expiryDate: '2025-05-02',
    minThreshold: 3,
    aiInsight: 'Supply adequate. Best price currently at Valley Foods ($2.25/lb).',
    predictedRunout: '2025-04-29',
    salesVelocity: 'Medium'
  },
  {
    id: 4, 
    name: 'Tomatoes', 
    quantity: 2, 
    unit: 'lbs', 
    category: 'Produce',
    expiryDate: '2025-04-22',
    minThreshold: 5, 
    aiInsight: 'Price up 15% due to recent weather. Consider menu substitution.',
    predictedRunout: '2025-04-19',
    salesVelocity: 'High'
  },
  {
    id: 5, 
    name: 'Avocados', 
    quantity: 6, 
    unit: 'pieces', 
    category: 'Produce',
    expiryDate: '2025-04-23',
    minThreshold: 10, 
    aiInsight: 'Ripening prediction: Ready to use in 2 days. Order schedule calibrated.',
    predictedRunout: '2025-04-20',
    salesVelocity: 'High'
  }
];

const Inventory = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [aiRecommendationsVisible, setAiRecommendationsVisible] = useState(false);
  
  const categories = ['All', ...new Set(inventory.map(item => item.category))];
  
  const lowStockItems = inventory.filter(
    item => item.quantity <= item.minThreshold
  );

  const filteredInventory = selectedCategory === 'All'
    ? inventory
    : inventory.filter(item => item.category === selectedCategory);

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const aiRecommendations = [
    "Order Tomatoes within 24 hours to avoid stockout (Priority: High)",
    "Adjust Tortilla par level to 200 based on recent sales velocity",
    "Consider alternative supplier for Ground Beef (potential savings: $1.45/lb)",
    "Shift avocado delivery to earlier in week based on ripening pattern",
    "Bundle excess items into a 'Special Combo' to reduce inventory carrying cost"
  ];

  return (
    <div className="container mx-auto max-w-md p-4 pb-24">
      <Header greeting="AI-Powered" name="Inventory Management" />
      
      {/* Remove the InventoryVisuals component which contains the images */}
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-truckmate-green flex items-center">
          Smart Inventory
          <div className="ml-2 p-1 bg-blue-100 rounded-full">
            <Sparkles size={16} className="text-blue-600" />
          </div>
        </h2>
        
        <button 
          className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          onClick={() => setAiRecommendationsVisible(!aiRecommendationsVisible)}
        >
          <Brain size={14} /> 
          AI Insights
        </button>
      </div>
      
      {aiRecommendationsVisible && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Brain size={18} className="text-blue-600 mr-2" />
              <h3 className="font-medium text-blue-800">AI Recommendations</h3>
            </div>
            <div className="text-xs text-blue-600 flex items-center">
              <Clock size={14} className="mr-1" />
              Updated 5 minutes ago
            </div>
          </div>
          <ul className="space-y-2">
            {aiRecommendations.map((suggestion, idx) => (
              <li key={idx} className="text-sm text-gray-700 flex items-start">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mr-2 flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {lowStockItems.length > 0 && (
        <div className="bg-truckmate-teal/10 p-4 rounded-xl mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-truckmate-teal mt-1" size={20} />
            <div>
              <h3 className="font-medium text-truckmate-green mb-1">AI Alert: Low Stock Detected</h3>
              <p className="text-sm text-truckmate-brown">
                {lowStockItems.map(item => item.name).join(', ')} are running low.
                Suggested order by {new Date().toLocaleDateString()}.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-truckmate-teal text-white'
                : 'bg-gray-100 text-truckmate-brown hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredInventory.map(item => (
          <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm mb-3">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-truckmate-teal/10 flex items-center justify-center flex-shrink-0">
                  <Package size={20} className="text-truckmate-teal" />
                </div>
                <div>
                  <h3 className="font-medium text-truckmate-green">{item.name}</h3>
                  <span className="text-xs text-truckmate-brown">
                    Category: {item.category}
                  </span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs ${
                item.quantity <= item.minThreshold / 2 ? 'bg-red-100 text-red-800' : 
                item.quantity <= item.minThreshold ? 'bg-yellow-100 text-yellow-800' : 
                'bg-green-100 text-green-800'
              }`}>
                {item.quantity <= item.minThreshold / 2 ? 'Critical' : 
                item.quantity <= item.minThreshold ? 'Low' : 'Good'}
              </div>
            </div>

            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  {item.quantity} {item.unit}
                </span>
              </div>
              <button
                onClick={() => handleUpdateQuantity(item.id, Math.max(0, item.quantity + 1))}
                className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Update
              </button>
            </div>

            <div className="mt-2 text-xs text-truckmate-brown">
              Expires: {new Date(item.expiryDate).toLocaleDateString()}
            </div>
            
            {/* AI Insight for each item */}
            <div className="mt-2 text-xs bg-blue-50 p-2 rounded-md flex items-start">
              <Sparkles size={14} className="text-blue-600 mr-1 mt-0.5 flex-shrink-0" />
              <span className="text-blue-800">{item.aiInsight}</span>
            </div>
            
            <div className="mt-2 flex justify-between text-xs">
              <div className="flex items-center">
                <TrendingUp size={14} className="text-gray-500 mr-1" />
                <span className="text-gray-600">Usage: {item.salesVelocity}</span>
              </div>
              <div className="text-gray-600">
                Predicted runout: {new Date(item.predictedRunout).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;