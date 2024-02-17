// LeafletMap.tsx
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface LeafletMapProps {
    position: [number, number];
    zoom: number;
    container: HTMLDivElement; // Add a new prop for the container reference
}

const LeafletMap: React.FC<LeafletMapProps> = ({ position, zoom, container }) => {
    return (
        <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} style={{ width: '100%', height: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default LeafletMap;
