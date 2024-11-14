import React, { useEffect } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import SearchBar from "../Components/SearchBar";
import MultiRangeSlider from "../Components/MultiRangeSlider";
import DynamicSelect from "../../Admin/Dashboard/Lodging/Components/Form/DynamicSelect";
import PackageCard from "../Components/PackageCard";
import { Inertia } from "@inertiajs/inertia";

const PackagesList = ({
    min_amount,
    max_amount,
    min_duration,
    max_duration,
    package_types,
    packages,
    total,
    currentPage,
    lastPage,
    sort,
    search,
}) => {
    const { url, props } = usePage();

    // Use useForm for managing form data
    const {
        get,
        data,
        setData,
        processing,
        errors: serverErrors,
    } = useForm({
        destination_id: props.filters?.destination_id || "",
        package_types: props.filters?.package_types || [],
        amount_range: props.filters?.amount_range || [min_amount, max_amount],
        duration_range: props.filters?.duration_range || [
            min_duration,
            max_duration,
        ],
        sort: props.filters?.sort || { field: sort.field, order: sort.order },
        search: props.filters?.search || search,
        page: currentPage || 1,
    });

    useEffect(() => {
        // Update the form data based on URL query parameters
        const params = new URLSearchParams(url.split("?")[1]);
        setData((prevData) => {
            const newData = { ...prevData };

            // Update only if params exist
            if (params.has("destination_id")) {
                newData.destination_id = params.get("destination_id");
            }

            const packageTypes = params.getAll("package_types[]");
            if (packageTypes.length > 0) {
                newData.package_types = packageTypes.map(Number);
            }

            if (
                params.has("amount_range[0]") ||
                params.has("amount_range[1]")
            ) {
                newData.amount_range = [
                    params.get("amount_range[0]")
                        ? parseFloat(params.get("amount_range[0]"))
                        : prevData.amount_range[0],
                    params.get("amount_range[1]")
                        ? parseFloat(params.get("amount_range[1]"))
                        : prevData.amount_range[1],
                ];
            }

            if (
                params.has("duration_range[0]") ||
                params.has("duration_range[1]")
            ) {
                newData.duration_range = [
                    params.get("duration_range[0]")
                        ? parseFloat(params.get("duration_range[0]"))
                        : prevData.duration_range[0],
                    params.get("duration_range[1]")
                        ? parseFloat(params.get("duration_range[1]"))
                        : prevData.duration_range[1],
                ];
            }

            if (params.has("sort[field]") || params.has("sort[order]")) {
                newData.sort = {
                    field: params.get("sort[field]") || prevData.sort.field,
                    order: params.get("sort[order]") || prevData.sort.order,
                };
            }

            if (params.has("search")) {
                newData.search = params.get("search");
            }

            if (params.has("page")) {
                newData.page = parseInt(params.get("page"), 10);
            }

            console.log("Data updated from URL params:", newData);
            return newData;
        });
    }, [url]);

    // Update local filter state
    const updateFilters = (key, value) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    // Helper to prepare form data properly for backend
    const prepareFormData = (formData) => {
        return {
            destination_id: formData.destination_id,
            "package_types[]": formData.package_types,
            "amount_range[0]": formData.amount_range[0],
            "amount_range[1]": formData.amount_range[1],
            "duration_range[0]": formData.duration_range[0],
            "duration_range[1]": formData.duration_range[1],
            "sort[field]": formData.sort.field,
            "sort[order]": formData.sort.order,
            search: formData.search,
            page: formData.page,
        };
    };

    // Handle search button click
    const handleSearch = () => {
        // Reset page to 1 when filters are updated
        const updatedData = {
            ...data,
            page: 1,
        };

        setData(updatedData);

        console.log("Data before search request:", updatedData);

        get(route("landing.package.search.index"), {
            preserveScroll: true,
            data: prepareFormData(updatedData),
            replace: true,
        });
    };

    const handleAmountChange = (range) => {
        updateFilters("amount_range", range);
    };

    const handleDurationChange = (range) => {
        updateFilters("duration_range", range);
    };

    const handlePackageTypeChange = (typeId) => {
        const updatedTypes = data.package_types.includes(typeId)
            ? data.package_types.filter((id) => id !== typeId)
            : [...data.package_types, typeId];
        updateFilters("package_types", updatedTypes);
    };

    const handleSortChange = (e) => {
        const [field, order] = e.target.value.split(":");
        const updatedData = {
            ...data,
            sort: { field, order },
            page: 1,
        };

        setData(updatedData);

        console.log("Data before sort request:", updatedData);

        // Trigger search immediately when sort changes
        get(route("landing.package.search.index"), {
            preserveScroll: true,
            data: prepareFormData(updatedData),
            replace: true,
        });
    };

    const handlePageChange = (page) => {
        const updatedData = {
            ...data,
            page,
        };

        setData(updatedData);

        console.log("Updated data in handlePageChange:", updatedData);
        console.log("Real data : ", prepareFormData(updatedData));

        Inertia.get(
            route("landing.package.search.index"),
            prepareFormData(updatedData),
            {
                preserveScroll: true,
            }
        );
    };
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= lastPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-4 py-2 mx-1 rounded-md transition-colors duration-300 ${
                        i === data.page
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
                value={data.search}
                onChange={(e) => updateFilters("search", e.target.value)}
            />
            <div className="flex justify-center bg-gray-100 py-10">
                <div className="flex w-full max-w-6xl">
                    {/* Sidebar Filter */}
                    <aside className="w-1/4 p-6 bg-white rounded-lg shadow-lg mr-8 h-full sticky top-10 overflow-y-auto max-h-[60vh]">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Filtrer
                        </h2>
                        <div className="relative mb-6">
                            <DynamicSelect
                                label="Destination"
                                name="destination_id"
                                selectedValue={data.destination_id}
                                onChange={(value) =>
                                    updateFilters("destination_id", value)
                                }
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
                                                checked={data.package_types.includes(
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

                        {/* Amount Range */}
                        <div className="mb-6">
                            <MultiRangeSlider
                                min={min_amount}
                                max={max_amount}
                                label="Prix"
                                unit="€"
                                value={data.amount_range}
                                onChange={handleAmountChange}
                            />
                        </div>

                        {/* Duration Range */}
                        <div className="mb-6">
                            <MultiRangeSlider
                                min={min_duration}
                                max={max_duration}
                                label="Durée (Jours)"
                                unit=""
                                value={data.duration_range}
                                onChange={handleDurationChange}
                            />
                        </div>

                        {/* Search Button */}
                        <div className="mt-6">
                            <button
                                onClick={handleSearch}
                                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                disabled={processing}
                            >
                                {processing ? "Recherche..." : "Rechercher"}
                            </button>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 max-w-3xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Affichage de {packages.length} sur {total}{" "}
                                Résultats
                            </h2>
                            <div className="flex items-center space-x-4">
                                <select
                                    className="px-4 py-2 border border-gray-300 rounded-lg"
                                    value={`${data.sort.field}:${data.sort.order}`}
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
                                <PackageCard key={index} package={apackage} />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="sm:flex gap-2 p-3 items-center float-right mr-20 mt-6">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        handlePageChange(data.page - 1)
                                    }
                                    disabled={data.page === 1}
                                    className={`px-3 py-1 rounded-md ${
                                        data.page === 1
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                                >
                                    Précédent
                                </button>

                                {renderPageNumbers()}

                                <button
                                    onClick={() =>
                                        handlePageChange(data.page + 1)
                                    }
                                    disabled={data.page === lastPage}
                                    className={`px-3 py-1 rounded-md ${
                                        data.page === lastPage
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
