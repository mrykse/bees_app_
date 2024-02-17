import React, { useEffect } from "react";
import { MapContainer, Circle, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
    coordinates: [number, number];
}

const Map: React.FC<MapProps> = ({ coordinates }) => {
    const position = coordinates;
    const fillBlueOptions = { fillColor: "#0484D6" };

    return (
        <>
            <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Circle center={position} pathOptions={fillBlueOptions} radius={50} />
        </>
    );
};

const ChangeView: React.FC<MapProps> = ({ coordinates }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(coordinates, 15);
    }, [coordinates, map]);
    return null;
};

const MapComponent: React.FC<MapProps> = ({ coordinates }) => {
    return (
        <MapContainer center={coordinates} zoom={20} style={{ height: "400px", width: "100%" }}>
            <ChangeView coordinates={coordinates} />
            <Map coordinates={coordinates} />
        </MapContainer>
    );
};

export default MapComponent;