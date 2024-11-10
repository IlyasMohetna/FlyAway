import { useState, Fragment, useEffect } from "react";
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout";
import { router, usePage } from "@inertiajs/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import DateTimeFormat from "../../../../Components/Date/DateTimeFormat";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTypeLogementModal from "./Components/AddTypeLogementModal";
import DeleteItemModal from "./Components/DeleteTypeLogementModal";

const TypeList = ({ data, total, currentPage, lastPage, sort, search }) => {
    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

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

    const openDeleteModal = (item) => {
        setSelectedItem(item);
        setIsDeleteModalOpen(true);
    };

    return (
        <>
            <ToastContainer />
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
                                    Les types de logements
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
                        <h5 className="text-xl font-semibold"></h5>
                        <button
                            type="button"
                            onClick={() => setIsAddModalOpen(true)}
                            className="group relative justify-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Ajouter +
                        </button>
                    </div>
                    <div className="border rounded-md border-ld overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="w-full">
                                    <tr>
                                        <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4 w-1/3">
                                            <span>Nom</span>
                                        </th>
                                        <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4 w-1/3">
                                            <span>Créer le</span>
                                        </th>
                                        <th className="text-base text-center text-ld font-semibold py-3 text-left border-b border-ld px-4 w-1/3">
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
                                                    <DateTimeFormat
                                                        datetime={
                                                            item.created_at
                                                        }
                                                    />
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4 text-center">
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openDeleteModal(
                                                                item
                                                            )
                                                        }
                                                        className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                                    >
                                                        <FaRegTrashAlt />
                                                    </button>
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

                <AddTypeLogementModal
                    open={isAddModalOpen}
                    setOpen={setIsAddModalOpen}
                />

                <DeleteItemModal
                    open={isDeleteModalOpen}
                    setOpen={setIsDeleteModalOpen}
                    id={selectedItem?.id}
                    name={selectedItem?.name}
                />
            </div>
        </>
    );
};

TypeList.layout = (page) => <AdminDashboardLayout children={page} />;

export default TypeList;
