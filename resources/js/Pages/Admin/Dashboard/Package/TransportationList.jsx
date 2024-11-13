import { useState } from "react";
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout";
import { router } from "@inertiajs/react";
import { FaRegTrashAlt } from "react-icons/fa";
import DateTimeFormat from "../../../../Components/Date/DateTimeFormat";
import DeleteConfirmModal from "../Lodging/Components/DeleteConfirmModal";
import AddButton from "../../../../Components/Buttons/AddButton";
import AddTransportationModeModal from "./Components/AddTransportationModeModal";

const TransportationList = ({
    data,
    total,
    currentPage,
    lastPage,
    sort,
    search,
}) => {
    const [sortField, setSortField] = useState(sort.field);
    const [sortOrder, setSortOrder] = useState(sort.order);
    const [searchQuery, setSearchQuery] = useState(search);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

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
            router.get(route("package.type"), {
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

    const openDeleteModal = (item) => {
        setSelectedItem(item);
        setIsDeleteModalOpen(true);
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
                                    Les modes de transports
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
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-base font-semibold py-3 text-left border-b px-4 w-1/3">
                                            Nom
                                        </th>
                                        <th className="text-base font-semibold py-3 text-left border-b px-4 w-1/3">
                                            Créer le
                                        </th>
                                        <th className="text-base font-semibold py-3 text-left border-b px-4 w-1/3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {data.map((item) => (
                                        <tr key={item.id}>
                                            <td className="py-3 px-4 text-sm">
                                                {item.name}
                                            </td>
                                            <td className="py-3 px-4 text-sm">
                                                <DateTimeFormat
                                                    datetime={item.created_at}
                                                />
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openDeleteModal(item)
                                                    }
                                                    className="text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5"
                                                >
                                                    <FaRegTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex gap-2 p-3 items-center float-right mt-6">
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded-md"
                            >
                                Précédent
                            </button>
                            {renderPageNumbers()}
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === lastPage}
                                className="px-3 py-1 rounded-md"
                            >
                                Suivant
                            </button>
                        </div>
                    </div>
                </div>

                {/* Modals */}
                <AddTransportationModeModal
                    open={isAddModalOpen}
                    setOpen={setIsAddModalOpen}
                />
                {selectedItem && (
                    <DeleteConfirmModal
                        open={isDeleteModalOpen}
                        setOpen={setIsDeleteModalOpen}
                        id={selectedItem.id}
                        name={selectedItem.name}
                        route={route(
                            "package.transport.delete",
                            selectedItem.id
                        )}
                    />
                )}
            </div>
        </>
    );
};

TransportationList.layout = (page) => <AdminDashboardLayout children={page} />;

export default TransportationList;
