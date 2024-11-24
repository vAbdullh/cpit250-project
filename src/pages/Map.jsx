import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useData } from "../context/DataContext";

const Map = () => {
    const { theme, userLocation } = useData();

    const defaultLocation = [24.7136, 46.6753];

    const defaultIcon = new L.Icon({
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    const UpdateMarker = () => {
        const map = useMap();

        useEffect(() => {
            if (userLocation) {
                map.setView(userLocation, 15); // Update map view to the new location
            }
        }, [map]); // Only depend on 'map', not 'userLocation'

        return userLocation ? (
            <Marker position={userLocation} icon={defaultIcon}>
                <Popup>You are here!</Popup>
            </Marker>
        ) : null;
    };

    return (
        <div className="h-screen overflow-hidden absolute top-0 left-0 z-[-1]">
            <MapContainer
                center={userLocation || defaultLocation}
                zoom={5}
                style={{ height: "100vh", width: "100vw" }}
                zoomControl={false}
            >
                <TileLayer
                    url={
                        theme === "dark"
                            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    }
                />
                <UpdateMarker />
            </MapContainer>
        </div>
    );
};

export default Map;
