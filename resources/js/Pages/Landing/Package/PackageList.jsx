import React, { useState, useEffect } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import SearchBar from "../Components/SearchBar";
import MultiRangeSlider from "../Components/MultiRangeSlider";
import DynamicSelect from "../../Admin/Dashboard/Lodging/Components/Form/DynamicSelect";
import PackageCard from "../Components/PackageCard";

const PackagesList = ({
    min_amount,
    max_amount,
    min_duration,
    max_duration,
    package_types,
    packages,
    total,
    currentPage: initialPage,
    lastPage,
    sort,
    search,
}) => {
    const { props } = usePage();

    // Initialize state variables
    const [destinationId, setDestinationId] = useState("");
    const [packageTypes, setPackageTypes] = useState([]);
    const [amountRange, setAmountRange] = useState([min_amount, max_amount]);
    const [durationRange, setDurationRange] = useState([
        min_duration,
        max_duration,
    ]);
    const [sortField, setSortField] = useState("created_at");
    const [sortOrder, setSortOrder] = useState("desc");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(initialPage || 1);

    // Parse URL parameters on initial load
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        // Destination ID
        if (params.has("destination_id")) {
            setDestinationId(params.get("destination_id"));
        }

        // Package Types
        const packageTypesParams = params.getAll("package_types[]");
        if (packageTypesParams.length > 0) {
            setPackageTypes(packageTypesParams.map(Number));
        }

        // Amount Range
        const amountMin = params.get("amount_range[0]");
        const amountMax = params.get("amount_range[1]");
        if (amountMin !== null && amountMax !== null) {
            setAmountRange([parseFloat(amountMin), parseFloat(amountMax)]);
        }

        // Duration Range
        const durationMin = params.get("duration_range[0]");
        const durationMax = params.get("duration_range[1]");
        if (durationMin !== null && durationMax !== null) {
            setDurationRange([
                parseFloat(durationMin),
                parseFloat(durationMax),
            ]);
        }

        // Sort Field and Order
        const sortFieldParam = params.get("sort[field]");
        const sortOrderParam = params.get("sort[order]");
        if (sortFieldParam) {
            setSortField(sortFieldParam);
        }
        if (sortOrderParam) {
            setSortOrder(sortOrderParam);
        }

        // Search Query
        if (params.has("search")) {
            setSearchQuery(params.get("search"));
        }

        // Page
        if (params.has("page")) {
            setCurrentPage(parseInt(params.get("page"), 10));
        }
    }, []);

    const handlePageChange = (page) => {
        if (page > 0 && page <= lastPage && page !== currentPage) {
            setCurrentPage(page);
            router.get(route("landing.package.search.index"), {
                destination_id: destinationId,
                "package_types[]": packageTypes,
                "amount_range[0]": amountRange[0],
                "amount_range[1]": amountRange[1],
                "duration_range[0]": durationRange[0],
                "duration_range[1]": durationRange[1],
                sort: { field: sortField, order: sortOrder },
                search: searchQuery,
                page,
            });
        }
    };

    const handleSearch = () => {
        setCurrentPage(1);
        router.get(route("landing.package.search.index"), {
            destination_id: destinationId,
            "package_types[]": packageTypes,
            "amount_range[0]": amountRange[0],
            "amount_range[1]": amountRange[1],
            "duration_range[0]": durationRange[0],
            "duration_range[1]": durationRange[1],
            sort: { field: sortField, order: sortOrder },
            search: searchQuery,
            page: 1,
        });
    };

    const handleAmountChange = (range) => {
        setAmountRange(range);
    };

    const handleDurationChange = (range) => {
        setDurationRange(range);
    };

    const handlePackageTypeChange = (typeId) => {
        const updatedTypes = packageTypes.includes(typeId)
            ? packageTypes.filter((id) => id !== typeId)
            : [...packageTypes, typeId];
        setPackageTypes(updatedTypes);
    };

    const handleSortChange = (e) => {
        const [field, order] = e.target.value.split(":");
        setSortField(field);
        setSortOrder(order);
        setCurrentPage(1);
        router.get(route("landing.package.search.index"), {
            destination_id: destinationId,
            "package_types[]": packageTypes,
            "amount_range[0]": amountRange[0],
            "amount_range[1]": amountRange[1],
            "duration_range[0]": durationRange[0],
            "duration_range[1]": durationRange[1],
            sort: { field, order },
            search: searchQuery,
            page: 1,
        });
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= lastPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-4 py-2 mx-1 rounded-md transition-colors duration-300 ${
                        i === currentPage
                            ? "bg-blue-500 text-white border border-blue-500 outline-none"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    }`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <>
            <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex justify-center bg-gray-100 py-10 min-h-screen">
                <div className="flex w-full max-w-6xl">
                    <aside className="w-1/4 p-6 bg-white rounded-lg shadow-lg mr-8 min-h-screen h-screen sticky top-0 overflow-y-auto">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Filtrer
                        </h2>

                        <div className="relative mb-6">
                            <DynamicSelect
                                label="Destination"
                                name="destination_id"
                                selectedValue={destinationId}
                                onChange={(value) => setDestinationId(value)}
                                fetchRoute={route("select.city")}
                                errors={{}}
                                noOptionsMessage="Veuillez sélectionner une destination !"
                                placeholder="Sélectionner une option"
                            />
                        </div>

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
                                                checked={packageTypes.includes(
                                                    type.id
                                                )}
                                                onChange={() =>
                                                    handlePackageTypeChange(
                                                        type.id
                                                    )
                                                }
                                                className="text-blue-500 rounded"
                                            />
                                            <span>{type.name}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-6">
                            <MultiRangeSlider
                                min={min_amount}
                                max={max_amount}
                                label="Prix"
                                unit="€"
                                value={amountRange}
                                onChange={handleAmountChange}
                            />
                        </div>

                        <div className="mb-6">
                            <MultiRangeSlider
                                min={min_duration}
                                max={max_duration}
                                label="Durée (Jours)"
                                unit=""
                                value={durationRange}
                                onChange={handleDurationChange}
                            />
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={handleSearch}
                                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                disabled={false}
                            >
                                Rechercher
                            </button>
                        </div>
                    </aside>

                    <main className="flex-1 max-w-3xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Affichage de {packages.length} sur {total}{" "}
                                Résultats
                            </h2>
                            <div className="flex items-center space-x-4">
                                <select
                                    className="px-4 py-2 border border-gray-300 rounded-lg"
                                    value={`${sortField}:${sortOrder}`}
                                    onChange={handleSortChange}
                                >
                                    <option value="created_at:desc">
                                        Filtrer Par: Date de publication
                                    </option>
                                    <option value="price:asc">
                                        Filtrer Par: Prix
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {packages.map((apackage, index) => (
                                <PackageCard key={index} apackage={apackage} />
                            ))}
                        </div>

                        <div className="sm:flex gap-2 p-3 items-center float-right mr-20 mt-6">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 rounded-md ${
                                        currentPage === 1
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                                >
                                    Précédent
                                </button>

                                {renderPageNumbers()}

                                <button
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    disabled={currentPage === lastPage}
                                    className={`px-3 py-1 rounded-md ${
                                        currentPage === lastPage
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                                >
                                    Suivant
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default PackagesList;
