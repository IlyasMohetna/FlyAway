import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import SearchBar from "../Components/SearchBar";
import MultiRangeSlider from "../Components/MultiRangeSlider";
import DynamicSelect from "../../Admin/Dashboard/Lodging/Components/Form/DynamicSelect";

const PackagesList = ({
    min_amount,
    max_amount,
    min_duration,
    max_duration,
    package_types,
}) => {
    const [amountRange, setAmountRange] = useState([min_amount, max_amount]);
    const [durationRange, setDurationRange] = useState([
        min_duration,
        max_duration,
    ]);

    const {
        post,
        data,
        setData,
        processing,
        errors: serverErrors,
    } = useForm({
        destination_id: "",
    });

    const [clientErrors, setClientErrors] = useState({});

    return (
        <>
            <SearchBar />
            <div className="flex justify-center bg-gray-100 py-10">
                <div className="flex w-full max-w-6xl">
                    <aside className="w-1/4 p-6 bg-white rounded-lg shadow-lg mr-8">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Filtrer
                        </h2>
                        <div className="relative mb-6">
                            <DynamicSelect
                                label="Destination"
                                name="destination_id"
                                selectedValue={data.destination_id}
                                // handleInputChange={handleInputChange}
                                fetchRoute={route("select.city")}
                                errors={serverErrors}
                                noOptionsMessage="Veuillez sélectionner une destination !"
                                placeholder="Sélectionner une option"
                            />
                        </div>

                        {/* Package Types */}
                        <div className="mb-6">
                            <h3 className="font-medium text-gray-700 mb-2">
                                Types de forfaits
                            </h3>
                            <ul>
                                {package_types.map((type) => (
                                    <li key={type.id}>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                className="text-blue-500 rounded"
                                            />
                                            <span>{type.name}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-6">
                            {" "}
                            <MultiRangeSlider
                                min={min_amount}
                                max={max_amount}
                                label="Prix"
                                unit="€"
                                onChange={setAmountRange}
                            />
                        </div>

                        <div className="mb-6">
                            <MultiRangeSlider
                                min={min_duration}
                                max={max_duration}
                                label="Durée (Jours)"
                                unit=""
                                onChange={setDurationRange}
                            />
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 max-w-3xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Showing 5 of 20 Results
                            </h2>
                            <div className="flex items-center space-x-4">
                                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                                    <option>
                                        Filtrer Par: Date de publication
                                    </option>
                                    <option>Filtrer Par: Prix</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-6">
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
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default PackagesList;
