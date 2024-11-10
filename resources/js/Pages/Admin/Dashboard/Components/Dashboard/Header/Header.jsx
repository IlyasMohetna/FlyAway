// Header.jsx
import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    const { auth } = usePage().props; // assuming auth user data is passed from Inertia
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        // post(route("logout")); // Adjust route as needed
    };

    return (
        <header className="flex items-center justify-between p-4 transition-transform duration-300 ease-in-out bg-gradient-to-b from-gray-800 to-gray-900">
            <h1 className="text-lg font-semibold"></h1>

            <div className="relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                >
                    <FaUserCircle className="text-2xl text-white" />
                    <span className="text-sm font-medium text-white">
                        {auth.user.data.firstname} {auth.user.data.lastname}
                    </span>
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg bg-boxdark-2">
                        <button
                            onClick={handleLogout}
                            className="block w-full px-4 py-4 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Se déconnecter
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
