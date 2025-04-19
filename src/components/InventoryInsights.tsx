
import React from 'react';
import { CirclePlus, AlertTriangle } from 'lucide-react';

interface InventoryInsight {
  message: string;
  type: 'prediction' | 'warning';
}

const InventoryInsights: React.FC = () => {
  // This would later be connected to an AI backend
  const mockInsights: InventoryInsight[] = [
    {
      message: "Based on historical data, Tortillas may sell out by 2pm today",
      type: "prediction"
    },
    {
      message: "Chicken Breast inventory might not last until dinner rush (5-7pm)",
      type: "warning"
    }
  ];

  return (
    <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <CirclePlus className="text-truckmate-teal" size={20} />
        <h3 className="font-medium text-truckmate-green">AI Menu Insights</h3>
      </div>
      <div className="space-y-3">
        {mockInsights.map((insight, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg text-sm flex items-start gap-2 ${
              insight.type === 'warning' 
                ? 'bg-truckmate-gold/10 text-truckmate-brown' 
                : 'bg-truckmate-teal/10 text-truckmate-brown'
            }`}
          >
            {insight.type === 'warning' && (
              <AlertTriangle size={16} className="text-truckmate-gold mt-0.5 flex-shrink-0" />
            )}
            <span>{insight.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryInsights;
