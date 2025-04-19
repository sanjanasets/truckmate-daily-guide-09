import React, { useState } from 'react';
import { AlertTriangle, Clock } from 'lucide-react';

interface InventoryItemProps {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  category: string;
  minThreshold: number;
  cost?: number;
  vendor?: string;
  lastOrdered?: string;
  onUpdateQuantity: (newQuantity: number) => void;
  onUpdateItem: (updatedItem: any) => void;
}

// Helper function to calculate days until expiry
const daysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const InventoryItem: React.FC<InventoryItemProps> = ({
  id,
  name,
  quantity,
  unit,
  expiryDate,
  category,
  minThreshold,
  cost = 0,
  vendor = '',
  lastOrdered = '',
  onUpdateQuantity,
  onUpdateItem,
}) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const [editing, setEditing] = useState(false);

  const [localItem, setLocalItem] = useState({
    name,
    unit,
    expiryDate,
    minThreshold,
    category,
    cost,
    vendor,
    lastOrdered
  });

  // Check if item is low in stock or about to expire
  const isLowStock = quantity <= minThreshold;
  const expiryDays = daysUntilExpiry(expiryDate);
  const isAboutToExpire = expiryDays >= 0 && expiryDays <= 3;

  const handleSave = () => {
    setEditing(false);
    onUpdateQuantity(localQuantity);
    onUpdateItem({ id, ...localItem });
  };

  const formatDate = (dateStr: string): string => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  // Quick increment/decrement for quantity
  const incrementQuantity = () => {
    const newQty = localQuantity + 1;
    setLocalQuantity(newQty);
    if (!editing) {
      onUpdateQuantity(newQty);
    }
  };

  const decrementQuantity = () => {
    if (localQuantity > 0) {
      const newQty = localQuantity - 1;
      setLocalQuantity(newQty);
      if (!editing) {
        onUpdateQuantity(newQty);
      }
    }
  };

  return (
    <div className={`bg-white p-4 rounded-xl shadow-sm space-y-2 ${isLowStock ? 'border-l-4 border-red-500' : isAboutToExpire ? 'border-l-4 border-yellow-500' : ''}`}>
      <div className="flex justify-between items-center">
        {editing ? (
          <input
            className="border p-1 rounded text-sm w-1/2"
            value={localItem.name}
            onChange={e => setLocalItem({ ...localItem, name: e.target.value })}
          />
        ) : (
          <h4 className="font-semibold">{name}</h4>
        )}
        <button
          onClick={() => (editing ? handleSave() : setEditing(true))}
          className="text-sm text-truckmate-teal font-medium"
        >
          {editing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-truckmate-brown">
        <div className="flex items-center">
          Quantity:
          <div className="flex items-center ml-2">
            <button
              onClick={decrementQuantity}
              className="w-6 h-6 rounded-l bg-gray-100 flex items-center justify-center"
            >
              -
            </button>
            <input
              type="number"
              value={localQuantity}
              onChange={e => setLocalQuantity(Number(e.target.value))}
              className="border rounded-none w-16 h-6 text-center"
            />
            <button
              onClick={incrementQuantity}
              className="w-6 h-6 rounded-r bg-gray-100 flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>
        <div>
          Unit:{' '}
          {editing ? (
            <input
              value={localItem.unit}
              onChange={e => setLocalItem({ ...localItem, unit: e.target.value })}
              className="border rounded p-1 w-20"
            />
          ) : (
            unit
          )}
        </div>
        <div>
          Category:{' '}
          {editing ? (
            <input
              value={localItem.category}
              onChange={e => setLocalItem({ ...localItem, category: e.target.value })}
              className="border rounded p-1 w-full"
            />
          ) : (
            category
          )}
        </div>
        <div>
          Min Threshold:{' '}
          {editing ? (
            <input
              type="number"
              value={localItem.minThreshold}
              onChange={e =>
                setLocalItem({ ...localItem, minThreshold: Number(e.target.value) })
              }
              className="border rounded p-1 w-16"
            />
          ) : (
            minThreshold
          )}
        </div>
        <div className="col-span-2">
          Expiry:{' '}
          {editing ? (
            <input
              type="date"
              value={localItem.expiryDate}
              onChange={e =>
                setLocalItem({ ...localItem, expiryDate: e.target.value })
              }
              className="border rounded p-1"
            />
          ) : (
            <span className={isAboutToExpire ? "text-yellow-600 font-medium flex items-center" : ""}>
              {formatDate(expiryDate)}
              {isAboutToExpire && (
                <>
                  <Clock className="ml-1 h-3 w-3" />
                  <span className="ml-1">{expiryDays} days left</span>
                </>
              )}
            </span>
          )}
        </div>
        {editing && (
          <>
            <div>
              Cost ($):{' '}
              <input
                type="number"
                step="0.01"
                value={localItem.cost}
                onChange={e =>
                  setLocalItem({ ...localItem, cost: Number(e.target.value) })
                }
                className="border rounded p-1 w-20"
              />
            </div>
            <div>
              Vendor:{' '}
              <input
                value={localItem.vendor}
                onChange={e => setLocalItem({ ...localItem, vendor: e.target.value })}
                className="border rounded p-1 w-full"
              />
            </div>
          </>
        )}
      </div>

      {isLowStock && !editing && (
        <div className="flex items-center text-xs text-red-600 mt-1">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Low stock alert - Below minimum threshold ({minThreshold} {unit})
        </div>
      )}
    </div>
  );
};

export default InventoryItem;
