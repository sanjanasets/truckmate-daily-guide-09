import React, { useState } from 'react';
import { PlusCircle, Download, Search } from 'lucide-react';
import Header from '../components/Header';
import InventoryItem from '../components/InventoryItem';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import InventoryInsights from '../components/InventoryInsights';
import InventoryVisuals from '../components/InventoryVisuals';

const initialInventory = [
  { id: 1, name: 'Chicken Breast', quantity: 15, unit: 'lbs', category: 'Meat', expiryDate: '2025-04-25', minThreshold: 20, cost: 4.99, vendor: 'Local Farms Inc.', lastOrdered: '2025-04-15' },
  { id: 2, name: 'Tortillas', quantity: 150, unit: 'pcs', category: 'Bread', expiryDate: '2025-04-23', minThreshold: 100, cost: 0.15, vendor: 'La Tortilla Factory', lastOrdered: '2025-04-12' },
  { id: 3, name: 'Avocados', quantity: 8, unit: 'pcs', category: 'Produce', expiryDate: '2025-04-22', minThreshold: 20, cost: 1.25, vendor: 'Fresh Produce Co.', lastOrdered: '2025-04-15' }
];

const daysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diff = expiry.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const Inventory = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '', quantity: 0, unit: 'pcs', category: '', expiryDate: new Date().toISOString().split('T')[0],
    minThreshold: 0, cost: 0, vendor: '', lastOrdered: new Date().toISOString().split('T')[0]
  });

  const categories = ['All', ...Array.from(new Set(inventory.map(item => item.category)))];
  const filtered = selectedCategory === 'All' ? inventory : inventory.filter(i => i.category === selectedCategory);
  const searched = filtered.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()) || i.vendor.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAdd = () => {
    const id = Math.max(...inventory.map(i => i.id)) + 1;
    setInventory([...inventory, { id, ...newItem }]);
    setShowAddForm(false);
    setNewItem({ ...newItem, name: '', quantity: 0, category: '', cost: 0, vendor: '' });
  };

  const exportCSV = () => {
    const headers = ['Name', 'Quantity', 'Unit', 'Category', 'Expiry Date', 'Min Threshold', 'Cost', 'Vendor', 'Last Ordered'];
    const rows = inventory.map(i => [i.name, i.quantity, i.unit, i.category, i.expiryDate, i.minThreshold, i.cost, i.vendor, i.lastOrdered]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory.csv';
    a.click();
  };

  return (
    <div className="container mx-auto max-w-md p-4 pb-24">
      <Header greeting="Stock check" name="Inventory Manager" />

      <Tabs defaultValue="items" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="items">
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input className="pl-8" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowAddForm(!showAddForm)}>
                <PlusCircle className="mr-1 h-4 w-4" /> Add
              </Button>
              <Button variant="outline" onClick={exportCSV}>
                <Download className="mr-1 h-4 w-4" /> Export
              </Button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {categories.map(c => (
              <button key={c} onClick={() => setSelectedCategory(c)} className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${selectedCategory === c ? 'bg-truckmate-teal text-white' : 'bg-gray-100 text-truckmate-brown hover:bg-gray-200'}`}>
                {c}
              </button>
            ))}
          </div>

          {showAddForm && (
            <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
              <h3 className="font-semibold mb-3">Add New Item</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Input placeholder="Item name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
                <Input type="number" placeholder="Qty" value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: +e.target.value })} />
                <Input placeholder="Unit" value={newItem.unit} onChange={e => setNewItem({ ...newItem, unit: e.target.value })} />
                <Input placeholder="Category" value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} />
                <Input type="date" value={newItem.expiryDate} onChange={e => setNewItem({ ...newItem, expiryDate: e.target.value })} />
                <Input type="number" placeholder="Min Threshold" value={newItem.minThreshold} onChange={e => setNewItem({ ...newItem, minThreshold: +e.target.value })} />
                <Input type="number" step="0.01" placeholder="Cost" value={newItem.cost} onChange={e => setNewItem({ ...newItem, cost: +e.target.value })} />
                <Input placeholder="Vendor" value={newItem.vendor} onChange={e => setNewItem({ ...newItem, vendor: e.target.value })} />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                <Button className="bg-truckmate-teal" onClick={handleAdd}>Add Item</Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {searched.map(item => (
              <InventoryItem key={item.id} item={item} onUpdateQuantity={() => {}} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <InventoryInsights
            totalItems={inventory.length}
            totalValue={inventory.reduce((sum, i) => sum + i.quantity * i.cost, 0)}
            lowStockCount={inventory.filter(i => i.quantity <= i.minThreshold).length}
            expiringCount={inventory.filter(i => daysUntilExpiry(i.expiryDate) <= 3).length}
          />
          <InventoryVisuals data={inventory} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;

