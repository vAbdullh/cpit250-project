import React, { createContext, useState, useContext, useEffect } from "react";

const DataContext = createContext();

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};

export const DataProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(false);

    // Theme definitions
    const lightTheme = {
        primaryColor: "#f2f2f2",
        secondaryColor: "#1a202c",
        textColor: "#2d3748",
    };

    const darkTheme = {
        primaryColor: "#000",
        secondaryColor: "#9ca4af",
        textColor: "#636363",
    };

    // Choose current theme
    const currentTheme = theme === "light" ? lightTheme : darkTheme;

    // Apply theme styles dynamically on theme change
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--primary-color", currentTheme.primaryColor);
        root.style.setProperty("--secondary-color", currentTheme.secondaryColor);
        root.style.setProperty("--text-color", currentTheme.textColor);
    }, [theme, currentTheme]);

    // Toggle between light and dark theme
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    // Update user location
    const updateLocation = (location) => {
        setUserLocation(location);
    };

    // Update loading state (for location fetching or other async processes)
    const updateLoadingState = (state) => {
        setLoading(state);
    };

    // Get user location using geolocation API
    const getUserLocation = () => {
        if (navigator.geolocation) {
            updateLoadingState(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    updateLocation([latitude, longitude]); // Set user location in context
                    updateLoadingState(false);
                },
                () => {
                    updateLoadingState(false); // Handle error and stop loading
                }
            );
        } else {
            console.log("Geolocation not supported");
            updateLoadingState(false); // Stop loading if geolocation is not supported
        }
    };

    return (
        <DataContext.Provider
            value={{
                theme,
                toggleTheme,
                userLocation,
                updateLocation,
                loading,
                setLoading,
                getUserLocation, // Provide the getUserLocation function for components
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
