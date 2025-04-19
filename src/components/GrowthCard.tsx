
import React from 'react';

interface GrowthCardProps {
  title: string;
  content: string;
}

const GrowthCard: React.FC<GrowthCardProps> = ({ title, content }) => {
  return (
    <div className="tm-card mb-4">
      <h3 className="font-bold text-truckmate-green mb-1">{title}</h3>
      <p className="text-sm text-truckmate-brown">{content}</p>
    </div>
  );
};

export default GrowthCard;
