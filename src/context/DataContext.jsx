import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context for your data
const DataContext = createContext();

// Custom hook to use the DataContext
export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};

// DataProvider component to wrap your app with the context
export const DataProvider = ({ children }) => {
    const [theme, setTheme] = useState("light"); // Store the current theme
    const [userLocation, setUserLocation] = useState(null); // Store user location (initially null)
    const [loading, setLoading] = useState(false); // Loading state for user location

    // Define light and dark theme styles
    const lightTheme = {
        primaryColor: "#f2f2f2", // white for light mode
        secondaryColor: "#1a202c", // dark gray for light mode
        textColor: "#2d3748", // darker text color for light mode
    };

    const darkTheme = {
        primaryColor: "#000", // black for dark mode
        secondaryColor: "#9ca4af", // lighter gray for dark mode
        textColor: "#636363", // text color for dark mode
    };

    // Select the current theme based on state
    const currentTheme = theme === "light" ? lightTheme : darkTheme;

    // Update the CSS variables for theme when the theme or currentTheme changes
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--primary-color", currentTheme.primaryColor);
        root.style.setProperty("--secondary-color", currentTheme.secondaryColor);
        root.style.setProperty("--text-color", currentTheme.textColor);
    }, [theme, currentTheme]);

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    // Function to update user location
    const updateLocation = (location) => {
        setUserLocation(location); // Update location
    };

    // Function to set loading state when fetching location
    const updateLoadingState = (state) => {
        setLoading(state); // Update loading state
    };

    return (
        <DataContext.Provider value={{ theme, toggleTheme, userLocation, updateLocation, loading, updateLoadingState }}>
            {children}
        </DataContext.Provider>
    );
};
