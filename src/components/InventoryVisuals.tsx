
import React from 'react';
import { Image } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const InventoryVisuals: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <AspectRatio ratio={4/3}>
          <div className="relative h-full">
            <img 
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80"
              alt="Location map"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-md text-xs text-truckmate-brown flex items-center gap-1">
              <Image size={12} />
              <span>Current Location</span>
            </div>
          </div>
        </AspectRatio>
      </div>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <AspectRatio ratio={4/3}>
          <div className="relative h-full">
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80"
              alt="Food inventory"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-md text-xs text-truckmate-brown flex items-center gap-1">
              <Image size={12} />
              <span>Current Stock</span>
            </div>
          </div>
        </AspectRatio>
      </div>
    </div>
  );
};

export default InventoryVisuals;
