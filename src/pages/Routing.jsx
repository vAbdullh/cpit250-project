import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { FaEthereum } from 'react-icons/fa'; // Import the Ethereum icon from react-icons
import { renderToString } from 'react-dom/server'; // Import to render React component as string
import { useData } from '../context/DataContext';

const Routing = () => {
    const { theme } = useData();
    const { end } = useParams(); // Get the destination from URL
    const [routeData, setRouteData] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null);

    // Get the user's current position
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition([latitude, longitude]); // Set the current position
                },
                (error) => {
                    console.error("Error getting current position:", error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            console.error("Geolocation is not available.");
        }
    }, []);

    // Fetch the route based on the current position and destination (end)
    useEffect(() => {
        if (currentPosition && end) {
            const [endLat, endLon] = end.split(',');

            const fetchRoute = async () => {
                const apiKey = process.env.REACT_APP_API_KEY;

                // Fetch route from OpenRouteService API
                const response = await fetch(
                    `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${currentPosition[1]},${currentPosition[0]}&end=${endLon},${endLat}`
                );
                const data = await response.json();
                setRouteData(data);
            };

            fetchRoute();
        }
    }, [currentPosition, end]);

    // Extract route coordinates from response
    const route = routeData ? routeData.features[0].geometry.coordinates : null;

    // Wrapper to dynamically adjust map based on current position
    const MapWrapper = () => {
        const map = useMap();

        useEffect(() => {
            if (currentPosition) {
                // Always center the map on the user's current position
                map.setView(currentPosition, 14, { animate: true });
            }
        }, [map, currentPosition]);

        return null;
    };

    // Render FaEthereum icon as a string for marker
    const ethereumIcon = new L.DivIcon({
        className: 'leaflet-ethereum-icon',
        html: renderToString(<FaEthereum style={{ color: 'red', fontSize: '32px' }} />), // Red color and 32px size
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
    });

    return (
        <div className="h-screen w-screen overflow-hidden absolute top-0 left-0 z-[-1]"
        >            {currentPosition ? (
            <MapContainer
                center={currentPosition} // Center the map on current location
                zoom={14} // Set zoom level
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
            >
                <TileLayer
                    url={
                        theme === "dark"
                            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    }
                />

                {/* Use the MapWrapper to keep the map centered on current position */}
                <MapWrapper />

                {/* Draw the route on the map */}
                {route && (
                    <Polyline
                        positions={route.map((coord) => [coord[1], coord[0]])}
                        color="blue"
                        weight={5}
                    />
                )}

                {/* Add marker for the current position using the FaEthereum icon */}
                {currentPosition && (
                    <Marker position={currentPosition} icon={ethereumIcon}>
                        <Popup>You are here</Popup>
                    </Marker>
                )}

                {/* Add marker for the end point (destination) */}
                {route && route[route.length - 1] && (
                    <Marker
                        position={[route[route.length - 1][1], route[route.length - 1][0]]}
                        icon={ethereumIcon} // Use the same icon for the destination
                    >
                        <Popup>End</Popup>
                    </Marker>
                )}
            </MapContainer>
        ) : (
            <div className='w-screen h-screen grid place-items-center bg-black'>
                <div className='border-2 border-blue-600 animate-spin size-32 rounded-full border-l-transparent'></div>
            </div>)}
        </div>
    );
};

export default Routing;
