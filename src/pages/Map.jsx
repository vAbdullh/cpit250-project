import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet"; // Import Leaflet for custom marker icon
import "leaflet/dist/leaflet.css";
import { useData } from "../context/DataContext"; // Import context

const Map = () => {
    const { theme, userLocation, updateLocation } = useData(); // Access context
    const [zoomLevel, setZoomLevel] = useState(5); // Default zoom level

    // Function to get the user's current location
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    updateLocation([latitude, longitude]); // Update location in context
                    setZoomLevel(15); // Zoom in on the user's location
                },
                (error) => {
                    console.log("Error getting location:", error);
                }
            );
        } else {
            console.log("Geolocation not supported");
        }
    };

    useEffect(() => {
        if (!userLocation) {
            getUserLocation(); // Only get the location if not already set
        }
    }, [userLocation]);

    // Default location if no location is available
    const defaultLocation = [24.7136, 46.6753]; // Riyadh as fallback
    const location = userLocation || defaultLocation;

    // Custom marker icon (fix default icon issue)
    const defaultIcon = new L.Icon({
        iconUrl: require("leaflet/dist/images/marker-icon.png"), // Default marker icon
        iconSize: [25, 41], // Set size
        iconAnchor: [12, 41], // Anchor point of the icon
        popupAnchor: [1, -34], // Position of popup relative to the icon
        shadowSize: [41, 41], // Shadow size
    });

    // Custom hook to update the map center and zoom level when location changes
    const UpdateMapView = () => {
        const map = useMap();
        useEffect(() => {
            if (userLocation) {
                map.setView(userLocation, zoomLevel); // Corrected: Use setView to update map center and zoom level
            }
        }, [userLocation, zoomLevel, map]);

        return null;
    };

    return (
        <div className="h-screen overflow-hidden absolute top-0 left-0 z-[-1]">
            <MapContainer
                center={location}
                zoom={zoomLevel}
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
                {userLocation && (
                    <Marker position={userLocation} icon={defaultIcon}>
                        <Popup>You are here!</Popup>
                    </Marker>
                )}
                <UpdateMapView />
            </MapContainer>
        </div>
    );
};

export default Map;
