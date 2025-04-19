
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Clock, Star, Users, AlertTriangle } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom marker icons
const createCustomIcon = (color) => {
  return L.divIcon({
    className: `custom-marker-${color}`,
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

// Location finder component
function LocationMarker({ onLocationFound }) {
  const map = useMapEvents({
    locationfound(e) {
      onLocationFound(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    }
  });
  
  return null;
}

// Sample locations that might work well for a food truck
const sampleLocations = [
  {
    id: 1,
    position: [41.8781, -87.6298],
    name: "Farmers Market",
    address: "5th & Pine St",
    footTraffic: "High",
    permitRequired: true,
    peakHours: "11:00 AM - 2:00 PM",
    isLoyaltyHotspot: true,
    color: "#00A6A6" // teal
  },
  {
    id: 2,
    position: [41.8831, -87.6250],
    name: "Tech District",
    address: "10th & Madison Ave",
    footTraffic: "Medium",
    permitRequired: true,
    peakHours: "12:00 PM - 3:00 PM",
    isLoyaltyHotspot: false,
    color: "#41521F" // green
  },
  {
    id: 3,
    position: [41.8751, -87.6350],
    name: "Riverside Park",
    address: "Riverside Dr & 8th",
    footTraffic: "Low",
    permitRequired: false,
    peakHours: "5:00 PM - 8:00 PM",
    isLoyaltyHotspot: false,
    weatherWarning: "Potential light rain around 6 PM",
    color: "#F49F0A" // gold
  }
];

const MapView = ({ onLocationSelect = () => {} }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const handleLocationFound = (latlng) => {
    setCurrentPosition(latlng);
  };
  
  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    onLocationSelect(location);
  };

  const locateMe = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Please check your browser permissions.");
      }
    );
  };

  return (
    <div className="relative h-[350px] rounded-xl overflow-hidden shadow mb-4">
      <MapContainer 
        center={currentPosition || [41.8781, -87.6298]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <LocationMarker onLocationFound={handleLocationFound} />
        
        {currentPosition && (
          <Marker 
            position={currentPosition}
            icon={createCustomIcon("#3388ff")}
          >
            <Popup>
              <div className="text-sm">
                <strong>Your Current Location</strong>
              </div>
            </Popup>
          </Marker>
        )}
        
        {sampleLocations.map((location) => (
          <Marker 
            key={location.id}
            position={location.position}
            icon={createCustomIcon(location.color)}
            eventHandlers={{
              click: () => handleLocationClick(location)
            }}
          >
            <Popup>
              <div className="text-sm space-y-1">
                <p className="font-bold text-truckmate-green">{location.name}</p>
                <p className="text-truckmate-brown">{location.address}</p>
                <div className="flex items-center space-x-1">
                  <Users size={12} />
                  <span>Foot traffic: {location.footTraffic}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={12} />
                  <span>Peak hours: {location.peakHours}</span>
                </div>
                {location.isLoyaltyHotspot && (
                  <div className="flex items-center space-x-1 text-truckmate-gold">
                    <Star size={12} />
                    <span>Loyalty Hotspot</span>
                  </div>
                )}
                {location.weatherWarning && (
                  <div className="flex items-center space-x-1 text-red-500">
                    <AlertTriangle size={12} />
                    <span>{location.weatherWarning}</span>
                  </div>
                )}
                <div className="pt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${location.permitRequired ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {location.permitRequired ? "Permit Required ✓" : "No Permit Needed"}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <button 
        onClick={locateMe}
        className="absolute bottom-4 right-4 z-[1000] bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        title="Find my location"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-truckmate-teal" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default MapView;
