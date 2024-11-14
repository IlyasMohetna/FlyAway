import React from "react";
import SearchBar from "../Components/SearchBar";
import ViewOnMap from "../Components/ViewOnMap";

const PackageView = ({ apackage }) => {
    return (
        <div>
            <SearchBar />
            <div className="container mx-auto max-w-5xl px-6 lg:px-16 py-8">
                <div className="flex">
                    {/* Left Content */}
                    <div className="w-4/6 pr-8">
                        {/* Package Summary */}
                        <div className="border-b pb-4 mb-4">
                            <h1 className="text-2xl font-semibold">
                                Eastern Discovery (Start New Orleans)
                            </h1>
                            <p className="text-sm text-gray-500 mt-2">
                                Prince St Station - View on map • 1 Review
                            </p>
                            <div className="flex flex-wrap mt-4 text-sm space-x-6">
                                <div>4 Hours</div>
                                <div>Max People: 12</div>
                                <div>Wifi Available</div>
                                <div>Jan 18 - Dec 21</div>
                                <div>Min Age: 12+</div>
                                <div>Pickup: Airport</div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold mb-2">
                                Description
                            </h2>
                            <p className="text-sm text-gray-700">
                                Start and end in San Francisco! With the
                                in-depth cultural tour Northern California
                                Summer 2019, you have an 8 day tour package
                                taking you through San Francisco, USA and 9
                                other destinations in USA.
                            </p>
                        </div>

                        {/* Highlights */}
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">
                                Highlights
                            </h3>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>
                                    Visit the Museum of Modern Art in Manhattan
                                </li>
                                <li>See amazing works of contemporary art</li>
                                <li>
                                    Check out Campbell's Soup Cans by Warhol and
                                    The Dance (I) by Matisse
                                </li>
                                <li>
                                    Free audio guides available in English,
                                    French, German, Italian, Spanish, Portuguese
                                </li>
                            </ul>
                        </div>

                        {/* Price Details */}
                        <div className="flex justify-between mt-4">
                            {/* Price Includes */}
                            <div>
                                <h4 className="text-lg font-semibold mb-2">
                                    Price Includes
                                </h4>
                                <ul className="list-disc list-inside text-gray-700">
                                    <li>Specialized bilingual guide</li>
                                    <li>Private Transport</li>
                                    <li>
                                        Entrance fees (Cable car and Moon
                                        Valley)
                                    </li>
                                    <li>
                                        Box lunch water, banana apple and
                                        chocolate
                                    </li>
                                </ul>
                            </div>
                            {/* Price Excludes */}
                            <div>
                                <h4 className="text-lg font-semibold mb-2">
                                    Price Excludes
                                </h4>
                                <ul className="list-disc list-inside text-gray-700">
                                    <li>Additional Services</li>
                                    <li>Insurance</li>
                                    <li>Drink</li>
                                    <li>Tickets</li>
                                </ul>
                            </div>
                        </div>

                        {/* Travel Styles & Facilities */}
                        <div className="mt-4">
                            <h4 className="text-lg font-semibold mb-2">
                                Travel Styles
                            </h4>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <span className="px-3 py-1 bg-gray-100 rounded-md">
                                    Cultural
                                </span>
                                <span className="px-3 py-1 bg-gray-100 rounded-md">
                                    Marine
                                </span>
                                <span className="px-3 py-1 bg-gray-100 rounded-md">
                                    Festival & Events
                                </span>
                            </div>
                            <h4 className="text-lg font-semibold mt-4 mb-2">
                                Facilities
                            </h4>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <span className="px-3 py-1 bg-gray-100 rounded-md">
                                    Gymnasium
                                </span>
                                <span className="px-3 py-1 bg-gray-100 rounded-md">
                                    Mountain Bike
                                </span>
                                <span className="px-3 py-1 bg-gray-100 rounded-md">
                                    Satellite Office
                                </span>
                            </div>
                        </div>

                        {/* Itinerary */}
                        <div className="mt-4">
                            <h4 className="text-lg font-semibold mb-2">
                                Itinerary
                            </h4>
                            <ul className="text-blue-600">
                                <li>Day 1 - Los Angeles</li>
                                <li>Day 2 - Lake Havasu City</li>
                                <li>Day 3 - Las Vegas/Bakersfield</li>
                                <li>Day 4 - San Francisco</li>
                            </ul>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="w-2/6">
                        <div>
                            <ViewOnMap
                                longitude={apackage.city.longitude}
                                latitude={apackage.city.latitude}
                            />
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg">
                            <div className="text-xl font-semibold mb-2">
                                From{" "}
                                <span className="line-through text-gray-500">
                                    $2,100
                                </span>{" "}
                                <span className="text-blue-600">$379</span>
                            </div>
                            <div className="text-xs text-red-600 mb-4">
                                Save 8%
                            </div>
                            {/* Booking Form */}
                            <form className="space-y-4">
                                <label className="block">
                                    <span className="text-gray-700">
                                        Start Date
                                    </span>
                                    <input
                                        type="date"
                                        className="mt-1 block w-full border rounded-md p-2"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">
                                        Adults
                                    </span>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full border rounded-md p-2"
                                        min="0"
                                        defaultValue="1"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">
                                        Children
                                    </span>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full border rounded-md p-2"
                                        min="0"
                                        defaultValue="0"
                                    />
                                </label>
                                <div className="flex justify-between items-center mt-4">
                                    <span>Extra Prices</span>
                                    <span>$100</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Service Fee</span>
                                    <span>$100</span>
                                </div>
                                <button
                                    type="button"
                                    className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Book Now
                                </button>
                            </form>

                            {/* Vendor Information */}
                            <div className="mt-8">
                                <p className="text-sm text-gray-700">
                                    Vendor 01
                                </p>
                                <p className="text-xs text-gray-500">
                                    Member since Oct 2024
                                </p>
                            </div>

                            {/* Why Book With Us Section */}
                            <div className="mt-8">
                                <h4 className="text-lg font-semibold mb-2">
                                    Why Book With Us?
                                </h4>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>No-hassle best price guarantee</li>
                                    <li>Customer care available 24/7</li>
                                    <li>Hand-picked Tours & Activities</li>
                                    <li>Free Travel Insurance</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageView;
