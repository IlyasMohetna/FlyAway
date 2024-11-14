import React from "react";
import { Link } from "@inertiajs/react";
import SearchBar from "../Components/SearchBar";

const PackagesList = () => {
    return (
        <>
            <SearchBar />
            <div className="flex justify-center bg-gray-100 py-10">
                <div className="flex w-full max-w-6xl">
                    {/* Sidebar Filter */}
                    <aside className="w-1/4 p-6 bg-white rounded-lg shadow-lg mr-8">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Filter
                        </h2>
                        {/* Search Box */}
                        <div className="relative mb-6">
                            <input
                                type="text"
                                placeholder="Search by package name"
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </div>
                        {/* Types of Tour */}
                        <div className="mb-6">
                            <h3 className="font-medium text-gray-700 mb-2">
                                Types of Tour
                            </h3>
                            <ul>
                                <li>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="text-blue-500 rounded"
                                        />{" "}
                                        <span>Beach</span>
                                    </label>
                                </li>
                                <li>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="text-blue-500 rounded"
                                        />{" "}
                                        <span>Mountain</span>
                                    </label>
                                </li>
                                <li>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="text-blue-500 rounded"
                                        />{" "}
                                        <span>Heritage</span>
                                    </label>
                                </li>
                                <li>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="text-blue-500 rounded"
                                        />{" "}
                                        <span>Desert</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                        {/* Pricing Scale */}
                        <div className="mb-6">
                            <h3 className="font-medium text-gray-700 mb-2">
                                Pricing Scale
                            </h3>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none"
                            />
                            <div className="flex justify-between text-sm text-gray-600 mt-2">
                                <span>$24</span>
                                <span>$62</span>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 max-w-3xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Showing 5 of 20 Results
                            </h2>
                            <div className="flex items-center space-x-4">
                                <div className="flex space-x-2">
                                    <button className="px-3 py-2 text-gray-600 rounded hover:bg-gray-200">
                                        Grid
                                    </button>
                                    <button className="px-3 py-2 text-blue-600 bg-blue-100 rounded">
                                        List
                                    </button>
                                    <button className="px-3 py-2 text-gray-600 rounded hover:bg-gray-200">
                                        Map
                                    </button>
                                </div>
                                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                                    <option>Sort By: Latest</option>
                                    <option>Sort By: Price</option>
                                </select>
                            </div>
                        </div>

                        {/* Package List */}
                        <div className="space-y-6">
                            {/* Package Card */}
                            <div className="flex items-center bg-white rounded-lg shadow-lg p-6">
                                <div className="w-1/4">
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="Dubai"
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                </div>
                                <div className="flex-1 px-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                                            16 Places
                                        </span>
                                        <span className="px-2 py-1 text-xs font-semibold text-orange-700 bg-orange-100 rounded-full">
                                            4 Activities
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        Dubai, UAE
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        4 Days 5 Nights • Capacity 12
                                    </p>
                                    <div className="flex items-center mt-2">
                                        <p className="text-2xl font-bold text-blue-600 mr-2">
                                            $5220
                                        </p>
                                        <span className="text-gray-500">
                                            / month
                                        </span>
                                    </div>
                                    <Link
                                        href="#"
                                        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                                <div className="flex items-center space-x-1 ml-auto text-yellow-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 .587l3.668 7.445L23.334 9.74l-5.668 5.524L19.002 24 12 20.312 4.998 24l1.336-8.736L0 9.74l7.666-1.708z" />
                                    </svg>
                                    <span className="text-sm font-semibold">
                                        4.8
                                    </span>
                                </div>
                            </div>
                            {/* Repeat similar package cards as needed */}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default PackagesList;
