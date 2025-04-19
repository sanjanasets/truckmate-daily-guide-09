import React from 'react';
import { Package, AlertTriangle, Clock } from 'lucide-react';
import Header from '../components/Header';

const Inventory = () => {
  return (
    <div className="container mx-auto max-w-md p-4 pb-24">
      <Header greeting="Stock check" name="What's in store?" />
      
      <div className="bg-truckmate-teal/10 p-4 rounded-xl mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-truckmate-teal mt-1" size={20} />
          <div>
            <h3 className="font-medium text-truckmate-green mb-1">Low Stock Alert</h3>
            <p className="text-sm text-truckmate-brown">Chicken and avocados are running low. Consider restocking soon.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {inventory.map((item) => (
          <div key={item.name} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-truckmate-green">{item.name}</h3>
                <p className="text-sm text-truckmate-brown">Quantity: {item.quantity}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock size={14} className="text-truckmate-brown" />
                  <span className="text-xs text-truckmate-brown">
                    Expires: {new Date(item.expiryDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs ${
                item.status === 'good' ? 'bg-green-100 text-green-800' :
                item.status === 'low' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {item.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
