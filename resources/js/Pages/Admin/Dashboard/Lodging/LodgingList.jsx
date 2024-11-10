import { useState } from "react";
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout";
import { router } from "@inertiajs/react";

const AttributList = ({ categories }) => {
    const { props } = usePage();
    const queryCategoryId = props?.category_id;

    const [selectedCategory, setSelectedCategory] = useState(
        categories.find((category) => category.id === queryCategoryId) || null
    );
    const [attributes, setAttributes] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedCategory) {
            fetchAttributes(selectedCategory.id, currentPage);
        }
    }, [selectedCategory, currentPage]);

    const fetchAttributes = async (categoryId, page = 1) => {
        try {
            setLoading(true);
            const response = await axios.get(
                route("lodging.attribut.data", categoryId),
                { params: { page } }
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

    return (
        <>
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
                                <h4 className="text-xl">
                                    Les attributs de{" "}
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

            <AddAttributModal
                open={isAddModalOpen}
                setOpen={setIsAddModalOpen}
                categoryId={selectedCategory?.id}
            />
        </>
    );
};
