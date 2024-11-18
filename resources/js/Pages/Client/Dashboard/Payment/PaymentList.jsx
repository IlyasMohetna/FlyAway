import { useState } from "react";
import UserDashboardLayout from "../Layouts/UserDashboardLayout";
import { Link, router } from "@inertiajs/react";
import DateTimeFormat from "../../../../Components/Date/DateTimeFormat";
import iconConfig from "../../../../iconConfig";
import MoneyFormat from "../../../../Components/Format/MoneyFormat";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdOutlineTravelExplore } from "react-icons/md";
import ButtonSpinner from "../../../../Components/Spinners/ButtonSpinner";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { AiFillBank } from "react-icons/ai";

const PaymentList = ({ data, total, currentPage, lastPage, sort, search }) => {
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

    const getCardType = (cardNumber) => {
        const visaRegex = /^4[0-9]{6,}$/; // Starts with 4
        const masterCardRegex = /^5[1-5][0-9]{5,}$/; // Starts with 51-55

        if (visaRegex.test(cardNumber)) {
            return "Visa";
        } else if (masterCardRegex.test(cardNumber)) {
            return "MasterCard";
        } else {
            return "Other";
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
            .post(route("client.dashboard.payment.invoice.show"), { id: id })
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
                                        <span>Montant</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Statut</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Date d'effectuation</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Méthode de paiement</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Mode de paiements</span>
                                    </th>
                                    <th className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4">
                                        <span>Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border dark:divide-darkborder">
                                {data.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <p className="text-black dark:text-bodytext text-sm">
                                                    <MoneyFormat
                                                        money={item.amount}
                                                    />
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <p className="text-black dark:text-bodytext text-sm">
                                                    <p className="text-black dark:text-bodytext text-sm">
                                                        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                                            Confirmé
                                                        </span>
                                                    </p>
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
                                                {item.paymentable_type ===
                                                "App\\Models\\PAYMENT\\CreditCard" ? (
                                                    <span className="bg-blue-100 w-32 flex items-center text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 space-x-2">
                                                        <BsFillCreditCard2BackFill className="text-sm" />
                                                        <span>
                                                            Carte bancaire
                                                        </span>
                                                    </span>
                                                ) : (
                                                    <span className="bg-pink-100 w-36 flex items-center text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-pink-400 border border-pink-400 space-x-2">
                                                        <AiFillBank className="text-sm" />
                                                        <span>
                                                            Compte bancaire
                                                        </span>
                                                    </span>
                                                )}
                                            </td>

                                            <td className="whitespace-nowrap py-3 px-4">
                                                {item.paymentable_type ===
                                                "App\\Models\\PAYMENT\\CreditCard" ? (
                                                    <>
                                                        {(() => {
                                                            const cardType =
                                                                getCardType(
                                                                    item
                                                                        .paymentable
                                                                        .card_number
                                                                );
                                                            console.log(
                                                                cardType
                                                            );
                                                            let cardLogo;

                                                            switch (cardType) {
                                                                case "Visa":
                                                                    cardLogo =
                                                                        "/assets/img/visa.png";
                                                                    break;
                                                                case "MasterCard":
                                                                    cardLogo =
                                                                        "/assets/img/mastercard.png";
                                                                    break;
                                                            }

                                                            return (
                                                                <span className="flex items-center space-x-2">
                                                                    <img
                                                                        src={
                                                                            cardLogo
                                                                        }
                                                                        alt={
                                                                            cardType
                                                                        }
                                                                        className="h-5 w-auto"
                                                                    />
                                                                    <span className="text-xs font-medium text-gray-800">
                                                                        XXXX-XXXX-XXXX-
                                                                        {item.paymentable.card_number.slice(
                                                                            -4
                                                                        )}
                                                                    </span>
                                                                </span>
                                                            );
                                                        })()}
                                                    </>
                                                ) : (
                                                    <span className="flex items-center space-x-2">
                                                        <img
                                                            src="/assets/img/bank.png"
                                                            className="h-5 w-auto"
                                                        />
                                                        <span className="text-xs font-medium text-gray-800">
                                                            IBAN :{" "}
                                                            {item.paymentable.iban.slice(
                                                                0,
                                                                2
                                                            ) +
                                                                "XXXXXXX..." +
                                                                item.paymentable.iban.slice(
                                                                    -4
                                                                )}
                                                        </span>
                                                    </span>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-4">
                                                <button
                                                    type="button"
                                                    disabled={
                                                        loadingInvoices[item.id]
                                                    }
                                                    onClick={() =>
                                                        showInvoice(item.id)
                                                    }
                                                    className="w-28 py-2 space-x-2 flex items-center justify-center text-xs font-medium text-center disabled:opacity-25 text-white bg-teal-600 hover:bg-teal-700 rounded-lg outline-none"
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

PaymentList.layout = (page) => (
    <UserDashboardLayout title={"Mes paiements"} children={page} />
);

export default PaymentList;
