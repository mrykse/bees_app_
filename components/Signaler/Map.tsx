import React, { useEffect, useState } from "react";
import { MapContainer, Circle, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
    coordinates: [number, number] | null;
    buttonClicked: boolean;
    setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>; // Ajout de setButtonClicked
}


const Map: React.FC<MapProps> = ({ coordinates }) => {
    const position = coordinates;
    const fillBlueOptions = { fillColor: "#0484D6" };

    return (
        <>
            <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {position && <Circle center={position} pathOptions={fillBlueOptions} radius={50} />}
        </>
    );
};

const ChangeView: React.FC<MapProps> = ({ coordinates, buttonClicked, setButtonClicked }) => {
    const map = useMap();

    useEffect(() => {
        if (buttonClicked && coordinates) {
            map.flyTo(coordinates, 15);
            setButtonClicked(false); // Set buttonClicked back to false after moving the map
        }
    }, [coordinates, buttonClicked, map, setButtonClicked]);

    return null;
};

const MapComponent: React.FC<MapProps & { setButtonClicked: (value: boolean) => void }> = ({ coordinates, buttonClicked, setButtonClicked }) => {
    return (
        <MapContainer center={coordinates ? coordinates : [0, 0]} zoom={20} style={{ height: "400px", width: "100%" }}>
            <ChangeView coordinates={coordinates} buttonClicked={buttonClicked} setButtonClicked={setButtonClicked} />
            <Map coordinates={coordinates} buttonClicked={buttonClicked} setButtonClicked={setButtonClicked}/>
        </MapContainer>
    );
};


export default MapComponent;
