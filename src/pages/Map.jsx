// FullScreenMap.js
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

const Map = () => {
    return (
        <div className="h-screen overflow-hidden absolute top-0 left-0 z-[-1]">
            <MapContainer
                center={[24.7136, 46.6753]}
                zoom={5}
                style={{ height: "100vh", width: "100vw" }}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
            </MapContainer>

        </div>
    );
};

export default Map;
