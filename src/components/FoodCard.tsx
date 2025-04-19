
import React from 'react';

interface FoodCardProps {
  name: string;
  ingredients: string[];
  servings: number;
  imageUrl?: string;
}

const FoodCard: React.FC<FoodCardProps> = ({ name, ingredients, servings, imageUrl }) => {
  return (
    <div className="tm-card mb-4">
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-truckmate-brown">
              No image
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-truckmate-green">{name}</h3>
          <p className="text-sm text-truckmate-brown mb-1">
            {ingredients.join(', ')}
          </p>
          <div className="text-xs px-2 py-1 bg-truckmate-teal/10 text-truckmate-teal inline-block rounded-full">
            Est. {servings} servings
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
