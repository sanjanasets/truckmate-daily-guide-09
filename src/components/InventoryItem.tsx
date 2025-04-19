
import React, { useState } from 'react';

interface InventoryItemProps {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  category: string;
  minThreshold: number;
  onUpdateQuantity: (newQuantity: number) => void;
  onUpdateItem: (updatedItem: any) => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({
  id,
  name,
  quantity,
  unit,
  expiryDate,
  category,
  minThreshold,
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
    category
  });

  const handleSave = () => {
    setEditing(false);
    onUpdateQuantity(localQuantity);
    onUpdateItem({ id, ...localItem });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">
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
        <div>
          Quantity:{' '}
          <input
            type="number"
            value={localQuantity}
            onChange={e => setLocalQuantity(Number(e.target.value))}
            className="border rounded p-1 w-20"
          />
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
            expiryDate
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
              className="border rounded p-1 w-20"
            />
          ) : (
            minThreshold
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;
