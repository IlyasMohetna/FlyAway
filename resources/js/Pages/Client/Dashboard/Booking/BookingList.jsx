import { useState } from "react";
import UserDashboardLayout from "../Layouts/UserDashboardLayout";
import { Link, router } from "@inertiajs/react";
import DateTimeFormat from "../../../../Components/Date/DateTimeFormat";
import DateFormat from "../../../../Components/Date/DateFormat";
import iconConfig from "../../../../iconConfig";
import MoneyFormat from "../../../../Components/Format/MoneyFormat";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdOutlineTravelExplore } from "react-icons/md";
import ButtonSpinner from "../../../../Components/Spinners/ButtonSpinner";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingList = ({ data, total, currentPage, lastPage, sort, search }) => {
    const [sortField, setSortField] = useState(sort.field);
    const [sortOrder, setSortOrder] = useState(sort.order);
    const [searchQuery, setSearchQuery] = useState(search);
    const [loadingInvoices, setLoadingInvoices] = useState({});

    const handleSort = (field) => {
        const order = sortOrder === "asc" ? "desc" : "asc";
        setSortField(field);
        setSortOrder(order);
        router.get(route("client.dashboard.bookings.show"), {
            sort: { field, order },
            search: searchQuery,
            page: currentPage,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("client.dashboard.bookings.show"), {
            search: searchQuery,
            sort: { field: sortField, order: sortOrder },
        });
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= lastPage) {
            router.get(route("client.dashboard.bookings.show"), {
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

    const showInvoice = (id) => {
        setLoadingInvoices((prev) => ({
            ...prev,
            [id]: true,
        }));

        axios
            .post(route("client.package.booking.invoice.show"), { id: id })
            .then((response) => {
                const { fileContent } = response.data;

                if (fileContent) {
                    const byteCharacters = atob(fileContent);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], {
                        type: "application/pdf",
                    });

                    const blobUrl = URL.createObjectURL(blob);
                    window.open(blobUrl);
                    setTimeout(() => {
                        URL.revokeObjectURL(blobUrl);
                    }, 10000);
                }

                setLoadingInvoices((prev) => ({
                    ...prev,
                    [id]: false,
                }));
            })
            .catch((error) => {
                setLoadingInvoices((prev) => ({
                    ...prev,
                    [id]: false,
                }));

                const errorMessage =
                    error.response?.data?.message ||
                    "Something went wrong. Please try again.";
                toast.error(errorMessage);
            });
    };

    return (
        <div className="container mx-auto p-6">
            <div className="pt-4 p-6">
                <div className="border rounded-md border-ld overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Type</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Date de début</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Date de fin</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Quantité</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Mode de transport</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Mode de logement</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Statut</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Montant</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Date de réservation</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border dark:divide-darkborder">
                                {data.map((item) => {
                                    const Icon =
                                        iconConfig[item.transportation.name] ||
                                        (() => <span></span>);
                                    return (
                                        <tr key={item.id}>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <p className="text-black dark:text-bodytext text-sm">
                                                    Forfait
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <p className="text-black dark:text-bodytext text-sm">
                                                    {item.start_date ? (
                                                        <DateFormat
                                                            date={
                                                                item.start_date
                                                            }
                                                        />
                                                    ) : (
                                                        "-"
                                                    )}
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <p className="text-black dark:text-bodytext text-sm">
                                                    {item.start_date ? (
                                                        <DateFormat
                                                            date={
                                                                item.start_date
                                                            }
                                                        />
                                                    ) : (
                                                        "-"
                                                    )}
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <p className="text-black dark:text-bodytext text-sm">
                                                    x{item.quantity}
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <p className="text-black dark:text-bodytext text-sm">
                                                    <Icon size="20" />
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <p className="text-black dark:text-bodytext text-sm">
                                                    {item.lodging.name}
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <p className="text-black dark:text-bodytext text-sm">
                                                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                                        Confirmé
                                                    </span>
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <p className="text-black dark:text-bodytext text-sm">
                                                    <MoneyFormat
                                                        money={
                                                            item.package
                                                                .amount_ttc *
                                                            item.quantity
                                                        }
                                                    />
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <p className="text-black dark:text-bodytext text-sm">
                                                    {item.created_at ? (
                                                        <DateFormat
                                                            date={
                                                                item.created_at
                                                            }
                                                        />
                                                    ) : (
                                                        "-"
                                                    )}
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <div className="space-x-2 flex">
                                                    <button
                                                        type="button"
                                                        className="px-3 py-2 space-x-2 flex text-xs font-medium text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg outline-none"
                                                    >
                                                        <FaEye className="mt-0.5" />
                                                        <b>Forfait</b>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={
                                                            loadingInvoices[
                                                                item.id
                                                            ]
                                                        }
                                                        onClick={() =>
                                                            showInvoice(item.id)
                                                        }
                                                        className="w-28 px-3 py-2 space-x-2 flex items-center justify-center text-xs font-medium text-center disabled:opacity-25 text-white bg-teal-600 hover:bg-teal-700 rounded-lg outline-none"
                                                    >
                                                        {loadingInvoices[
                                                            item.id
                                                        ] ? (
                                                            <span className="flex justify-center items-center">
                                                                <ButtonSpinner />
                                                            </span>
                                                        ) : (
                                                            <>
                                                                <FaFileInvoiceDollar className="mt-0.5" />
                                                                <b>Facture</b>
                                                            </>
                                                        )}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="px-3 py-2 space-x-2 flex text-xs font-medium text-center text-white bg-rose-600 hover:bg-rose-700 rounded-lg outline-none"
                                                    >
                                                        <MdOutlineTravelExplore className="mt-0.5" />
                                                        <b>Itineraire</b>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
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

BookingList.layout = (page) => (
    <UserDashboardLayout title={"Mes réservations"} children={page} />
);

export default BookingList;
