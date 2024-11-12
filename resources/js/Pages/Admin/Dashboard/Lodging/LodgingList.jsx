import { useState } from "react";
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout";
import { Link, router } from "@inertiajs/react";
import DateTimeFormat from "../../../../Components/Date/DateTimeFormat";

const LodgingList = ({ data, total, currentPage, lastPage, sort, search }) => {
    const [sortField, setSortField] = useState(sort.field);
    const [sortOrder, setSortOrder] = useState(sort.order);
    const [searchQuery, setSearchQuery] = useState(search);

    const handleSort = (field) => {
        const order = sortOrder === "asc" ? "desc" : "asc";
        setSortField(field);
        setSortOrder(order);
        router.get(route("lodging.index"), {
            sort: { field, order },
            search: searchQuery,
            page: currentPage,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("lodging.index"), {
            search: searchQuery,
            sort: { field: sortField, order: sortOrder },
        });
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= lastPage) {
            router.get(route("lodging.index"), {
                page,
                sort: { field: sortField, order: sortOrder },
                search: searchQuery,
            });
        }
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
                            ? "bg-blue-500 text-white border border-blue-500"
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
        <div className="container mx-auto p-6">
            <div
                data-testid="flowbite-card"
                className="flex relative w-full break-words flex-col card p-6 dark:shadow-dark-md mb-6 py-4 bg-lightinfo dark:bg-darkinfo overflow-hidden rounded-md border-none shadow-none dark:shadow-none"
                style={{ borderRadius: 7 }}
            >
                <div className="flex h-full flex-col justify-start gap-0 p-0">
                    <div className="items-center grid grid-cols-12 gap-6">
                        <div className="col-span-9">
                            <h4 className="font-semibold text-xl text-dark dark:text-white mb-3">
                                La liste des logements
                            </h4>
                        </div>
                        <div className="col-span-3 flex justify-center -mb-10">
                            <img
                                alt=""
                                loading="lazy"
                                width={168}
                                height={165}
                                decoding="async"
                                data-nimg={1}
                                className="md:-mb-[31px] -mb-4 "
                                src="/assets/img/ChatBc.png"
                                style={{ color: "transparent" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-4 p-6">
                <div className="border rounded-md border-ld overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Nom</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Type</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Ville</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Region</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Pays</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Date d'ajout</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border dark:divide-darkborder">
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td className="whitespace-nowrap py-3 px-4">
                                            <p className="text-black dark:text-bodytext text-sm">
                                                {item.name}
                                            </p>
                                        </td>
                                        <td className="whitespace-nowrap py-3 px-4">
                                            <p className="text-black dark:text-bodytext text-sm">
                                                {item.type.name}
                                            </p>
                                        </td>
                                        <td className="whitespace-nowrap py-3 px-4">
                                            <p className="text-black dark:text-bodytext text-sm">
                                                {item.real_city.name}
                                            </p>
                                        </td>
                                        <td className="whitespace-nowrap py-3 px-4">
                                            <p className="text-black dark:text-bodytext text-sm">
                                                {item.real_city.region.name}
                                            </p>
                                        </td>
                                        <td className="whitespace-nowrap py-3 px-4">
                                            <p className="text-black dark:text-bodytext text-sm">
                                                {
                                                    item.real_city.region
                                                        .country.name
                                                }
                                            </p>
                                        </td>
                                        <td className="whitespace-nowrap py-3 px-4">
                                            <p className="text-black dark:text-bodytext text-sm">
                                                {item.created_at ? (
                                                    <DateTimeFormat
                                                        datetime={
                                                            item.created_at
                                                        }
                                                    />
                                                ) : (
                                                    "-"
                                                )}
                                            </p>
                                        </td>
                                        <td className="whitespace-nowrap py-3 px-4">
                                            <div>
                                                <Link
                                                    as="button"
                                                    href={route(
                                                        "lodging.edit.show",
                                                        { lodging_id: item.id }
                                                    )}
                                                >
                                                    <button
                                                        type="button"
                                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                    >
                                                        Modifier
                                                    </button>
                                                </Link>
                                                <Link
                                                    as="button"
                                                    href={route(
                                                        "lodging.rooms.index",
                                                        { lodging_id: item.id }
                                                    )}
                                                >
                                                    <button
                                                        type="button"
                                                        class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                                    >
                                                        Chambres
                                                    </button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="sm:flex gap-2 p-3 items-center float-right mr-20 mt-6">
                        <div className="flex items-center gap-2 ">
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
                </div>
            </div>
        </div>
    );
};

LodgingList.layout = (page) => <AdminDashboardLayout children={page} />;

export default LodgingList;
