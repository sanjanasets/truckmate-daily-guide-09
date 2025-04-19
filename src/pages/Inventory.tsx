import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Header from '../components/Header';
import InventoryItem from '../components/InventoryItem';

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

  const handleUpdateItem = (updatedItem: any) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item
      )
    );
  };

  return (
    <div className="container mx-auto max-w-md p-4 pb-24">
      <Header greeting="Stock check" name="Stock & Prep Tracker" />

      <div className="bg-white shadow-sm rounded-xl p-4 mb-4">
        <h3 className="text-lg font-semibold text-truckmate-green mb-2">
          Prep Smart Today
        </h3>
        <ul className="text-sm text-truckmate-brown space-y-1">
          <li>🍳 You can prep ~32 Chicken Tacos with current stock.</li>
          <li>⚠️ Tortillas may sell out by <strong>2 PM</strong>.</li>
        </ul>
      </div>

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
            onUpdateQuantity={(newQty) => handleUpdateQuantity(item.id, newQty)}
            onUpdateItem={handleUpdateItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
