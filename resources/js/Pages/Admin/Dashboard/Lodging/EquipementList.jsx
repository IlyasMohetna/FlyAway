import { useState, useEffect } from "react";
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout";
import { FaRegTrashAlt } from "react-icons/fa";
import DateTimeFormat from "../../../../Components/Date/DateTimeFormat";
import { BeatLoader } from "react-spinners";
import AddAttributModal from "./Components/AddAttributModal";
import AddButton from "../../../../Components/Buttons/AddButton";
import DeleteConfirmModal from "./Components/DeleteConfirmModal";
import AddAttributCategorieModal from "./Components/AddAttributCategorieModal";
import AddEquipementCategorieModal from "./Components/AddEquipementCategorieModal";
import AddEquipementModal from "./Components/AddEquipementModal";

const EquipementList = ({ categories }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [attributes, setAttributes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isAddCategorieModalOpen, setIsAddCategorieModalOpen] =
        useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleteCategorieModalOpen, setIsDeleteCategorieModalOpen] =
        useState(false);

    const [loading, setLoading] = useState(false);
    const [selectedEquipement, setSelectedEquipement] = useState(null);

    useEffect(() => {
        if (selectedCategory) {
            fetchAttributes(selectedCategory.id, currentPage);
        }
    }, [selectedCategory, currentPage]);

    const fetchAttributes = async (categoryId, page = 1) => {
        try {
            setLoading(true);
            const response = await axios.get(
                route("lodging.equipement.data", categoryId),
                {
                    params: { page },
                }
            );
            const { data, currentPage, lastPage } = response.data.props;
            setAttributes(data);
            // setTotal(total);
            setCurrentPage(currentPage);
            setLastPage(lastPage);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load attributes. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
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

    const openDeleteModal = (item) => {
        setSelectedEquipement(item);
        setIsDeleteModalOpen(true);
    };

    const openDeleteCategorieModal = (item) => {
        setSelectedCategory(item);
        setIsDeleteCategorieModalOpen(true);
    };

    return (
        <>
            <div className="flex container mx-auto p-6">
                <div className="w-2/6 p-4 border-r">
                    <div className="flex">
                        <div className="w-4/6">
                            <h4 className="font-semibold text-xl mb-4">
                                Choisir une catégorie
                            </h4>
                        </div>
                        <div className="w-2/6">
                            <AddButton
                                action={() => setIsAddCategorieModalOpen(true)}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        {categories.map((category) => (
                            <div className="grid grid-cols-6 gap-4 p-2">
                                <div className="col-span-4">
                                    <button
                                        key={category.id}
                                        className={`cursor-pointer w-full p-2 outline-none rounded-2xl ${
                                            selectedCategory?.id === category.id
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-100"
                                        }`}
                                        onClick={() =>
                                            handleCategoryClick(category)
                                        }
                                    >
                                        {category.name}
                                    </button>
                                </div>
                                <div className="col-span-2 float-right w-full">
                                    <button
                                        type="button"
                                        className="text-white bg-red-400 hover:bg-red-500 font-medium outline-none rounded-lg text-sm px-5 py-2.5 me-2 mt-1"
                                        onClick={() =>
                                            openDeleteCategorieModal(category)
                                        }
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-4/6 p-4 relative">
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
                                <h4 className="text-xl">
                                    Les equipements de{" "}
                                    <b>{selectedCategory.name}</b> :
                                </h4>
                                <AddButton
                                    action={() => setIsAddModalOpen(true)}
                                />
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
                                                            onClick={() =>
                                                                openDeleteModal(
                                                                    attribute
                                                                )
                                                            }
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

            <AddEquipementModal
                open={isAddModalOpen}
                setOpen={setIsAddModalOpen}
                categoryId={selectedCategory?.id}
                onAddSuccess={() => fetchAttributes(selectedCategory?.id, 1)}
            />

            <AddEquipementCategorieModal
                open={isAddCategorieModalOpen}
                setOpen={setIsAddCategorieModalOpen}
            />

            {selectedEquipement && (
                <DeleteConfirmModal
                    open={isDeleteModalOpen}
                    setOpen={setIsDeleteModalOpen}
                    id={selectedEquipement.id}
                    name={selectedEquipement.name}
                    route={route(
                        "lodging.equipement.delete",
                        selectedEquipement.id
                    )}
                    onSuccess={() => fetchAttributes(selectedCategory?.id, 1)}
                />
            )}

            {selectedCategory && (
                <DeleteConfirmModal
                    open={isDeleteCategorieModalOpen}
                    setOpen={setIsDeleteCategorieModalOpen}
                    id={selectedCategory.id}
                    name={selectedCategory.name}
                    route={route(
                        "lodging.equipement_categorie.delete",
                        selectedCategory.id
                    )}
                    onSuccess={() => setSelectedCategory(null)}
                />
            )}
        </>
    );
};

EquipementList.layout = (page) => <AdminDashboardLayout children={page} />;

export default EquipementList;
