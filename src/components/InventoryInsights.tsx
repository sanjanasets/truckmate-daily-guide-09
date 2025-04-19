
import React from 'react';
import { CirclePlus, AlertTriangle, Info } from 'lucide-react';

interface InventoryInsight {
  headline: string;
  details: string;
  type: 'prediction' | 'warning';
}

const InventoryInsights: React.FC = () => {
  // Enhanced insights with clearer structure
  const mockInsights: InventoryInsight[] = [
    {
      headline: "Tortillas Selling Fast",
      details: "Predicted to sell out by 2pm today based on historical sales data",
      type: "prediction"
    },
    {
      headline: "Low Chicken Breast Stock",
      details: "Inventory might not last until dinner rush (5-7pm)",
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
            className={`p-3 rounded-lg text-sm flex items-start gap-3 ${
              insight.type === 'warning' 
                ? 'bg-truckmate-gold/10 text-truckmate-brown' 
                : 'bg-truckmate-teal/10 text-truckmate-brown'
            }`}
          >
            {insight.type === 'warning' ? (
              <AlertTriangle size={20} className="text-truckmate-gold mt-0.5 flex-shrink-0" />
            ) : (
              <Info size={20} className="text-truckmate-teal mt-0.5 flex-shrink-0" />
            )}
            <div>
              <div className="font-semibold mb-1">{insight.headline}</div>
              <div className="text-xs text-truckmate-brown/80">{insight.details}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryInsights;
