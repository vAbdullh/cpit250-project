import React, { useState } from "react";
import Map from "./Map";
import { IoSearchOutline } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useData } from "../context/DataContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import L from "leaflet"; // التأكد من استخدام مكتبة Leaflet لحساب المسافة

export default function Home() {
    const [inputValue, setInputValue] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [distance, setDistance] = useState(null); // لتخزين المسافة بين الموقعين
    const [userLocation, setUserLocation] = useState(null); // تخزين موقع المستخدم
    const { updateLocation, loading, setLoading } = useData();

    // Handle input changes
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Expand search input field
    const handleInputClick = () => {
        setIsExpanded(true);
    };

    // Close the search input field
    const handleCloseClick = () => {
        setIsExpanded(false);
    };

    // Update location based on geolocation
    const handleLocationClick = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);  // تخزين موقع المستخدم
                    updateLocation([latitude, longitude]);  // Update location in context
                    setLoading(false);  // Stop loading
                },
                (error) => {
                    console.log("Error getting location:", error);
                    setLoading(false);  // Stop loading
                }
            );
        } else {
            console.log("Geolocation not supported");
            setLoading(false);  // Stop loading
        }
    };

    // Handle the search functionality using OpenStreetMap API
    const handleSearch = async () => {
        if (inputValue.trim() === "") return;
        setLoading(true);

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(inputValue)}&format=json&limit=1`
            );
            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon, display_name } = data[0];
                updateLocation([lat, lon]);  // Update location in context with search result coordinates
                setLoading(false);

                // تحقق من وجود موقع المستخدم قبل حساب المسافة
                if (userLocation) {
                    // حساب المسافة بين الموقعين باستخدام Leaflet
                    const distanceInKm = calculateDistance(userLocation, [lat, lon]);
                    setDistance(distanceInKm); // تحديث المسافة في الحالة
                }
            } else {
                console.log("No results found for this location.");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching location:", error);
            setLoading(false);
        }
    };

    // حساب المسافة بين نقطتين باستخدام Leaflet
    const calculateDistance = (loc1, loc2) => {
        if (loc1 && loc2) {
            const point1 = L.latLng(loc1[0], loc1[1]); // تحويل الإحداثيات إلى نقطتين باستخدام Leaflet
            const point2 = L.latLng(loc2[0], loc2[1]);
            return point1.distanceTo(point2) / 1000; // حساب المسافة وتحويلها إلى كيلومتر
        }
        return null; // إذا كانت الإحداثيات غير صالحة
    };

    return (
        <div>
            {/* If device does not support geolocation */}
            <div className="hidden lg:grid place-items-center h-screen w-screen bg-gray-200">
                <p className="text-3xl font-bold text-red-700">Your device is not supported</p>
            </div>

            {/* For mobile view */}
            <div className="lg:hidden mx-auto overflow-hidden">
                <div
                    className={`bg-primary text-default fixed left-0 bottom-8 transition-all ${isExpanded ? "h-5/6" : "h-64"
                        } w-screen p-10 rounded-t-3xl shadow-2xl`}
                >
                    <div className="min-h-6 flex justify-end">
                        {isExpanded && (
                            <button onClick={handleCloseClick} className="p-3">
                                <IoMdClose className="text-secondary cursor-pointer" size={32} />
                            </button>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold">Where are you planning to go today?</h2>
                        <button
                            onClick={handleLocationClick}
                            className={`flex gap-1 p-2 items-center text-white whitespace-nowrap overflow-ellipsis text-xs rounded-md m-1 w-fit  ${loading ? "bg-blue-300 cursor-wait" : "bg-blue-600 transition-all transform active:scale-90"
                                }`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <p>Loading...</p>
                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                </>
                            ) : (
                                <>
                                    <p>My Location</p>
                                    <FaLocationArrow />
                                </>
                            )}
                        </button>
                    </div>
                    <div className="relative bg-white w-full mt-5 rounded-lg p-2 flex gap-2 border border-black">
                        <IoSearchOutline className="size-7" />
                        <input
                            type="text"
                            placeholder="Search for destination..."
                            value={inputValue}
                            onChange={handleInputChange}
                            onClick={handleInputClick}
                            className="bg-transparent outline-none ring-transparent text-black placeholder:text-gray-500 flex-1"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 text-white p-2 rounded-md"
                            disabled={loading}
                        >
                            Search
                        </button>
                    </div>
                    {distance !== null && (
                        <div className="mt-5 text-white font-bold">
                            <p>Distance: {distance.toFixed(2)} km</p> {/* عرض المسافة */}
                        </div>
                    )}
                </div>

                <Map />
            </div>
        </div>
    );
}
