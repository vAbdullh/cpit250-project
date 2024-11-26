import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Map from "./Map";
import { IoSearchOutline } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useData } from "../context/DataContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";

export default function Home() {
    const [inputValue, setInputValue] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchResults, setSearchResults] = useState([]); // State to hold search results
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

    // Fetch location search results from OpenStreetMap's Nominatim API
    useEffect(() => {
        if (inputValue.trim() !== "") {
            const fetchSearchResults = async () => {
                setLoading(true); // Show loading state
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json&addressdetails=1&limit=5&apikey=reactapp_apit_key`
                );
                const data = await response.json();
                setSearchResults(data); // Set the search results in state
                setLoading(false); // Hide loading state
            };

            fetchSearchResults();
        } else {
            setSearchResults([]); // Clear results when input is empty
        }
    }, [inputValue, setLoading]);

    // Update location based on geolocation
    const handleLocationClick = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
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
                    </div>

                    {isExpanded && (
                        <ul className="flex flex-col gap-2 p-5 pb-36 text-secondary max-h-56 overflow-scroll">
                            {searchResults.length > 0 ? (
                                searchResults.map((result, index) => (
                                    <li key={index} className="flex items-center justify-start gap-2 py-2 border-b w-full border-secondary">
                                        <FaLocationDot size={16} />
                                        <Link
                                            to={`/route/${result.lat},${result.lon}`} // Using React Router's Link with lat, lon
                                            className="text-blue-600 hover:underline"
                                        >
                                            {result.display_name}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <p>No results found</p>
                            )}
                        </ul>
                    )}
                </div>

                <Map />
            </div>
        </div>
    );
}
