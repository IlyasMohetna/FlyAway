import { useState, useEffect } from "react";
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout";
import { FaRegTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTypeLogementModal from "./Components/AddTypeLogementModal";
import DeleteItemModal from "./Components/DeleteTypeLogementModal";
import DateTimeFormat from "../../../../Components/Date/DateTimeFormat";
import { ClipLoader } from "react-spinners"; // Choose your preferred spinner from react-spinners
import { BeatLoader } from "react-spinners"; // Import the new loader

const AttributList = ({ categories }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [attributes, setAttributes] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(false); // New loading state

    useEffect(() => {
        if (selectedCategory) {
            fetchAttributes(selectedCategory.id, currentPage);
        }
    }, [selectedCategory, currentPage]);

    const fetchAttributes = async (categoryId, page = 1) => {
        try {
            setLoading(true); // Show loading overlay
            const response = await axios.get(
                route("lodging.attribut.data", categoryId),
                {
                    params: { page },
                }
            );
            const { data, total, currentPage, lastPage } = response.data.props;
            setAttributes(data);
            setTotal(total);
            setCurrentPage(currentPage);
            setLastPage(lastPage);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load attributes. Please try again.");
        } finally {
            setLoading(false); // Hide loading overlay
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset page to 1 when a new category is selected
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= lastPage) {
            setCurrentPage(page);
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
        <>
            <ToastContainer />
            <div className="flex container mx-auto p-6">
                <div className="w-1/4 p-4 border-r">
                    <h4 className="font-semibold text-xl mb-4">
                        Choisir une catégorie
                    </h4>
                    <ul className="space-y-2">
                        {categories.map((category) => (
                            <li
                                key={category.id}
                                className={`cursor-pointer p-2 ${
                                    selectedCategory?.id === category.id
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100"
                                }`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-3/4 p-4 relative">
                    {loading && (
                        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
                            <BeatLoader
                                size={15}
                                color="#ffffff"
                                loading={loading}
                            />
                        </div>
                    )}
                    {selectedCategory?.id ? (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-xl font-semibold">
                                    Les attributs de la catégorie :
                                </h4>
                                <button
                                    type="button"
                                    className="text-white bg-blue-700 px-4 py-2 rounded-lg"
                                >
                                    Add Attribute +
                                </button>
                            </div>

                            <div className="border rounded-md overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr>
                                                <th className="text-left py-3 px-4">
                                                    Name
                                                </th>
                                                <th className="text-left py-3 px-4">
                                                    Créer le
                                                </th>
                                                <th className="text-left text-center py-3 px-4">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {attributes.map((attribute) => (
                                                <tr key={attribute.id}>
                                                    <td className="py-3 px-4">
                                                        {attribute.name}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <DateTimeFormat
                                                            datetime={
                                                                attribute.created_at
                                                            }
                                                        />
                                                    </td>
                                                    <td className="py-3 px-4 text-center">
                                                        <button
                                                            type="button"
                                                            className="text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                                        >
                                                            <FaRegTrashAlt />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex gap-2 p-3 items-center float-right mt-6">
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
                                        Previous
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
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Please select a category to view its attributes.</p>
                    )}
                </div>
            </div>
        </>
    );
};

AttributList.layout = (page) => <AdminDashboardLayout children={page} />;

export default AttributList;
