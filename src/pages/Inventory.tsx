
import React, { useState } from 'react';
import { Package, AlertTriangle } from 'lucide-react';
import Header from '../components/Header';
import InventoryItem from '../components/InventoryItem';

// For demo purposes, we'll use this data
// In a real app, this would come from a backend
const initialInventory = [
  {
    id: 1,
    name: 'Chicken Breast',
    quantity: 15,
    unit: 'lbs',
    category: 'Meat',
    expiryDate: '2025-04-25',
    minThreshold: 20,
  },
  {
    id: 2,
    name: 'Tortillas',
    quantity: 150,
    unit: 'pcs',
    category: 'Bread',
    expiryDate: '2025-04-23',
    minThreshold: 100,
  },
  {
    id: 3,
    name: 'Avocados',
    quantity: 8,
    unit: 'pcs',
    category: 'Produce',
    expiryDate: '2025-04-22',
    minThreshold: 20,
  },
  {
    id: 4,
    name: 'Tomatoes',
    quantity: 25,
    unit: 'lbs',
    category: 'Produce',
    expiryDate: '2025-04-21',
    minThreshold: 15,
  },
  {
    id: 5,
    name: 'Cheese',
    quantity: 40,
    unit: 'lbs',
    category: 'Dairy',
    expiryDate: '2025-05-01',
    minThreshold: 30,
  }
];

const Inventory = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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

  return (
    <div className="container mx-auto max-w-md p-4 pb-24">
      <Header greeting="Stock check" name="What's in store?" />
      
      {lowStockItems.length > 0 && (
        <div className="bg-truckmate-teal/10 p-4 rounded-xl mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-truckmate-teal mt-1" size={20} />
            <div>
              <h3 className="font-medium text-truckmate-green mb-1">Low Stock Alert</h3>
              <p className="text-sm text-truckmate-brown">
                {lowStockItems.map(item => item.name).join(', ')} are running low.
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
          <InventoryItem
            key={item.id}
            {...item}
            onUpdateQuantity={(newQuantity) => 
              handleUpdateQuantity(item.id, newQuantity)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
