import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation for routing
import { FaHome } from 'react-icons/fa';
import { TiDocument } from 'react-icons/ti';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { MdDarkMode } from 'react-icons/md';  // Dark Mode Icon
import { IoMdSunny } from 'react-icons/io';  // Light Mode Icon
import { useData } from '../context/DataContext'; // Import the context to handle theme

export default function Navbar() {
    const [activeTab, setActiveTab] = useState('home'); // Track the active tab
    const { theme, toggleTheme } = useData();  // Access the theme state from context
    const location = useLocation(); // Get the current path from useLocation

    // Reset the activeTab state if the path matches '/route/:end'
    useEffect(() => {
        if (location.pathname.startsWith('/route/')) {
            setActiveTab('');  // Reset the active tab state
        }
    }, [location]);  // Run the effect whenever the location changes

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleThemeToggle = () => {
        toggleTheme();
    };

    return (
        <div className={`bg-primary text-default fixed bottom-0 left-0 w-full p-2 transition-all transform`}>
            <div className="flex justify-around">
                <Link
                    to="/"  // Link to the home page
                    onClick={() => handleTabChange('home')}
                    className={`flex flex-col items-center ${activeTab === 'home' ? 'text-green-500' : 'text-default'}`}
                >
                    <FaHome size={30} />
                    <span>Home</span>
                </Link>

                <Link
                    to="/docs"  // Link to the docs page
                    onClick={() => handleTabChange('docs')}
                    className={`flex flex-col items-center ${activeTab === 'docs' ? 'text-green-500' : 'text-default'}`}
                >
                    <TiDocument size={30} />
                    <span>Docs</span>
                </Link>

                <Link
                    to="/help"  // Link to the help page
                    onClick={() => handleTabChange('help')}
                    className={`flex flex-col items-center ${activeTab === 'help' ? 'text-green-500' : 'text-default'}`}
                >
                    <IoMdHelpCircleOutline size={30} />
                    <span>Help</span>
                </Link>

                {/* Theme Toggle Button */}
                <button
                    onClick={handleThemeToggle}
                    className='flex flex-col items-center'
                >
                    <div className='relative h-8 flex items-center justify-center'>
                        <IoMdSunny
                            size={30}
                            className={`text-yellow-500  absolute transition-all duration-300 ${theme === 'dark' ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100 '}`}
                        />

                        <MdDarkMode
                            size={30}
                            className={`text-gray-700 absolute  transition-all duration-300 ${theme === 'light' ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}
                        />
                    </div>

                    <span>Theme</span>
                </button>
            </div>
        </div>
    );
}
