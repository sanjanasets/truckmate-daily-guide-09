
import React, { useState } from 'react';
import { Package, Plus, Minus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InventoryItemProps {
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate: string;
  minThreshold: number;
  onUpdateQuantity: (newQuantity: number) => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({
  name,
  quantity,
  unit,
  category,
  expiryDate,
  minThreshold,
  onUpdateQuantity,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(quantity);

  const getStatusColor = () => {
    const ratio = quantity / minThreshold;
    if (ratio <= 0.5) return 'bg-red-100 text-red-800';
    if (ratio <= 1) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const handleConfirmUpdate = () => {
    onUpdateQuantity(tempQuantity);
    setIsEditing(false);
  };

  const adjustQuantity = (amount: number) => {
    setTempQuantity(Math.max(0, tempQuantity + amount));
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm mb-3">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-truckmate-teal/10 flex items-center justify-center flex-shrink-0">
            <Package size={20} className="text-truckmate-teal" />
          </div>
          <div>
            <h3 className="font-medium text-truckmate-green">{name}</h3>
            <span className="text-xs text-truckmate-brown">
              Category: {category}
            </span>
          </div>
        </div>
        <div className={cn('px-3 py-1 rounded-full text-xs', getStatusColor())}>
          {quantity <= minThreshold / 2 ? 'Critical' : 
           quantity <= minThreshold ? 'Low' : 'Good'}
        </div>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-4">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => adjustQuantity(-1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
              <span className="text-sm font-medium w-12 text-center">
                {tempQuantity} {unit}
              </span>
              <button
                onClick={() => adjustQuantity(1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
              <button
                onClick={handleConfirmUpdate}
                className="ml-2 p-1 rounded-full text-green-600 hover:bg-green-50"
              >
                <Check size={16} />
              </button>
            </div>
          ) : (
            <span className="text-sm font-medium">
              {quantity} {unit}
            </span>
          )}
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {isEditing ? 'Cancel' : 'Update'}
        </button>
      </div>

      <div className="mt-2 text-xs text-truckmate-brown">
        Expires: {new Date(expiryDate).toLocaleDateString()}
      </div>
    </div>
  );
};

export default InventoryItem;
