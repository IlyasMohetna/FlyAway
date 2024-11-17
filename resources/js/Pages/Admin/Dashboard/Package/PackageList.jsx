import { useState } from "react";
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout";
import { Link, router } from "@inertiajs/react";
import DateTimeFormat from "../../../../Components/Date/DateTimeFormat";
import MoneyFormat from "../../../../Components/Format/MoneyFormat";
import AddButton from "../../../../Components/Buttons/AddButton";
import AddPackageModal from "./Components/AddPackageModal";
import { MdPublic } from "react-icons/md";
import { MdPublicOff } from "react-icons/md";
import HandlePackageAccess from "./Components/HandlePackageAccess";

const PackageList = ({ data, total, currentPage, lastPage, sort, search }) => {
    const [sortField, setSortField] = useState(sort.field);
    const [sortOrder, setSortOrder] = useState(sort.order);
    const [searchQuery, setSearchQuery] = useState(search);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
    const [selectedPackageId, setSelectedPackageId] = useState(false);

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

    const openPackageAccessModal = (id) => {
        setSelectedPackageId(id);
        setIsAccessModalOpen(true);
    };

    return (
        <>
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
                                    La liste des forfaits
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
                    <div className="flex justify-between items-center border-b border-ld px-6 py-4">
                        <div></div>
                        <AddButton action={() => setIsAddModalOpen(true)} />
                    </div>

                    <div className="border rounded-md border-ld overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                            <span>Titre</span>
                                        </th>
                                        <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                            <span>Montant TTC</span>
                                        </th>
                                        <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                            <span>Durée</span>
                                        </th>
                                        <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                            <span>Type</span>
                                        </th>
                                        <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                            <span>Destination</span>
                                        </th>
                                        <th className="text-base text-ld text-center font-semibold py-3 border-b border-ld px-4">
                                            <span>Visibilité</span>
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
                                                    {item.title}
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <p className="text-black dark:text-bodytext text-sm">
                                                    <MoneyFormat
                                                        money={item.amount_ttc}
                                                    />
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <p className="text-black dark:text-bodytext text-sm">
                                                    {item.duration} jours
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <p className="text-black dark:text-bodytext text-sm">
                                                    {item.type.name}
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <p className="text-black dark:text-bodytext text-sm">
                                                    {item.city.name}
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4 text-center">
                                                <p className="text-black dark:text-bodytext text-sm">
                                                    {item.public ? (
                                                        <div className="inline-flex items-center justify-center space-x-1 bg-green-100 text-green-800 text-xs font-medium rounded border border-green-400 px-1 py-0.5">
                                                            <span>Public</span>
                                                            <MdPublic
                                                                size={15}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="inline-flex items-center justify-center space-x-1 bg-red-100 text-red-800 text-xs font-medium rounded border border-red-400 px-1 py-0.5 ">
                                                            <span>
                                                                Exclusive
                                                            </span>
                                                            <MdPublicOff
                                                                size={15}
                                                            />
                                                        </div>
                                                    )}
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <div>
                                                    {item.public ? (
                                                        <button
                                                            type="button"
                                                            class="focus:outline-none cursor-not-allowed text-white bg-purple-200  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 "
                                                        >
                                                            Gérer l'accès
                                                        </button>
                                                    ) : (
                                                        <button
                                                            class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                                                            onClick={() =>
                                                                openPackageAccessModal(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            Gérer l'accès
                                                        </button>
                                                    )}
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
            <AddPackageModal
                open={isAddModalOpen}
                setOpen={setIsAddModalOpen}
            />
            <HandlePackageAccess
                open={isAccessModalOpen}
                setOpen={setIsAccessModalOpen}
                packageId={selectedPackageId}
            />
        </>
    );
};

PackageList.layout = (page) => <AdminDashboardLayout children={page} />;

export default PackageList;
