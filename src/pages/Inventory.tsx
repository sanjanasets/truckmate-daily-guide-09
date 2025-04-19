import React, { useState, useEffect } from 'react';
import { AlertTriangle, PlusCircle, Save, Filter, Download, Search } from 'lucide-react';
import Header from '../components/Header';
import InventoryItem from '../components/InventoryItem';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import InventoryInsights from '../components/InventoryInsights';
import InventoryVisuals from '../components/InventoryVisuals';

const initialInventory = [
  {
    id: 1,
    name: 'Chicken Breast',
    quantity: 15,
    unit: 'lbs',
    category: 'Meat',
    expiryDate: '2025-04-25',
    minThreshold: 20,
    cost: 4.99,
    vendor: 'Local Farms Inc.',
    lastOrdered: '2025-04-15',
  },
  // ... (rest of inventory items as you had)
];

// Helper function
const daysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const Inventory = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 0,
    unit: 'pcs',
    category: '',
    expiryDate: new Date().toISOString().split('T')[0],
    minThreshold: 0,
    cost: 0,
    vendor: '',
    lastOrdered: new Date().toISOString().split('T')[0]
  });

  const categories = ['All', ...Array.from(new Set(inventory.map(item => item.category)))];

  const lowStockItems = inventory.filter(item => item.quantity <= item.minThreshold);
  const aboutToExpireItems = inventory.filter(item => {
    const days = daysUntilExpiry(item.expiryDate);
    return days >= 0 && days <= 3;
  });

  const filteredInventory = selectedCategory === 'All'
    ? inventory
    : inventory.filter(item => item.category === selectedCategory);

  const filteredAndSearchedInventory = filteredInventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.vendor && item.vendor.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const handleAddItem = () => {
    if (newItem.name.trim() === '') {
      alert('Please enter a name for the item');
      return;
    }
    const newId = Math.max(...inventory.map(item => item.id)) + 1;
    setInventory([...inventory, { id: newId, ...newItem }]);
    setNewItem({
      name: '',
      quantity: 0,
      unit: 'pcs',
      category: '',
      expiryDate: new Date().toISOString().split('T')[0],
      minThreshold: 0,
      cost: 0,
      vendor: '',
      lastOrdered: new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
  };

  const exportInventory = () => {
    const headers = ['Name', 'Quantity', 'Unit', 'Category', 'Expiry Date', 'Min Threshold', 'Cost', 'Vendor', 'Last Ordered'];
    const csvContent = [
      headers.join(','),
      ...inventory.map(item => [
        item.name, item.quantity, item.unit, item.category,
        item.expiryDate, item.minThreshold, item.cost, item.vendor, item.lastOrdered
      ].join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'food-truck-inventory.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto max-w-md p-4 pb-24">
      <Header greeting="Stock check" name="Inventory Manager" />

      <Tabs defaultValue="items" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowAddForm(!showAddForm)} className="flex items-center">
                <PlusCircle className="mr-1 h-4 w-4" />
                Add
              </Button>
              <Button variant="outline" onClick={exportInventory} className="flex items-center">
                <Download className="mr-1 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
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

          {showAddForm && (
            <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
              <h3 className="font-semibold mb-3">Add New Item</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {/* form inputs (same as before) */}
                <Input placeholder="Item name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                {/* more inputs... */}
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                <Button className="bg-truckmate-teal" onClick={handleAddItem}>Add Item</Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {filteredAndSearchedInventory.map(item => (
              <InventoryItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <InventoryInsights
            totalItems={inventory.length}
            totalValue={inventory.reduce((acc, item) => acc + item.quantity * item.cost, 0)}
            lowStockCount={lowStockItems.length}
            expiringCount={aboutToExpireItems.length}
          />
          <InventoryVisuals data={inventory} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;
