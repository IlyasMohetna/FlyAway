import React from "react";
import { Link } from "@inertiajs/react";

function PackageCard() {
    return (
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
                    <span className="text-gray-500">/ month</span>
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
                <span className="text-sm font-semibold">4.8</span>
            </div>
        </div>
    );
}

export default PackageCard;
