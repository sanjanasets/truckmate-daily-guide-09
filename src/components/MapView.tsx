
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  return (
    <div className="h-[300px] rounded-xl overflow-hidden shadow mb-4">
      <MapContainer center={[41.8781, -87.6298]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution="Map data © OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[41.8781, -87.6298]}>
          <Popup>
            5th & Pine – Farmers Market<br />
            Foot traffic: High<br />
            Permit Required ✅
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
