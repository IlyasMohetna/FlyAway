import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

export default function HandlePackageAccess({ open, setOpen, packageId }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && packageId) {
            resetState();
            fetchInitialData();
        }
    }, [open, packageId]);

    const resetState = () => {
        setSearchTerm("");
        setSearchResults([]);
        setSelectedUsers([]);
    };

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const { data: selected } = await axios.get(
                route("package.link.users.data", { id: packageId })
            );
            const selectedUsersList = Array.isArray(selected) ? selected : [];
            setSelectedUsers(selectedUsersList);

            const { data: allUsers } = await axios.get(
                route("package.link.user.search", { id: packageId }),
                {
                    params: { search: "" },
                }
            );

            const filteredUsers = allUsers.filter(
                (user) =>
                    !selectedUsersList.some(
                        (selected) => selected.id === user.id
                    )
            );
            setSearchResults(filteredUsers);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            if (searchTerm && packageId) {
                setLoading(true);
                const { data } = await axios.get(
                    route("package.link.user.search", { id: packageId }),
                    {
                        params: { search: searchTerm },
                    }
                );

                const filteredUsers = data.filter(
                    (user) =>
                        !selectedUsers.some(
                            (selected) => selected.id === user.id
                        )
                );
                setSearchResults(filteredUsers);
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    };

    const addUserToList = (user) => {
        setSelectedUsers((prev) => [...prev, user]);
        setSearchResults((prev) => prev.filter((u) => u.id !== user.id));
        axios
            .post(route("package.link.user.add", { id: packageId }), {
                user_id: user.id,
            })
            .then(() => console.log("User added successfully"))
            .catch((error) => console.error("Error adding user:", error));
    };

    const removeUserFromList = async (userId) => {
        setLoading(true); // Start the loading indicator
        try {
            await axios.post(
                route("package.link.user.unlink", { id: packageId }),
                {
                    user_id: userId,
                }
            );

            setSelectedUsers((prev) =>
                prev.filter((user) => user.id !== userId)
            );

            if (searchTerm) {
                await handleSearch();
            } else {
                fetchInitialData();
            }

            console.log("User removed successfully");
        } catch (error) {
            console.error("Error removing user:", error);
        } finally {
            setLoading(false); // End the loading indicator
        }
    };

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50"
                onClose={() => setOpen(false)}
            >
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center p-4 text-center">
                        <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
                                Gérer l'accès au forfait
                            </Dialog.Title>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 border rounded-md">
                                    <h4 className="text-md font-semibold mb-3">
                                        Rechercher des utilisateurs
                                    </h4>
                                    <input
                                        type="text"
                                        placeholder="Rechercher un utilisateur..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            handleSearch();
                                        }}
                                        className="w-full mb-4 p-2 border rounded-md"
                                    />
                                    {loading ? (
                                        <div className="flex justify-center my-4">
                                            <ClipLoader
                                                size={30}
                                                color="#4A90E2"
                                            />
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {searchResults.map((user) => (
                                                <div
                                                    key={user.id}
                                                    className="flex items-center justify-between p-2 border rounded-md"
                                                >
                                                    <span>
                                                        {user.firstname}{" "}
                                                        {user.lastname}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            addUserToList(user)
                                                        }
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        Ajouter
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 border rounded-md">
                                    <h4 className="text-md font-semibold mb-3">
                                        Utilisateurs sélectionnés
                                    </h4>
                                    <div className="space-y-2">
                                        {selectedUsers.map((user) => (
                                            <div
                                                key={user.id}
                                                className="flex items-center justify-between p-2 border rounded-md"
                                            >
                                                <span>
                                                    {user.firstname}{" "}
                                                    {user.lastname}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeUserFromList(
                                                            user.id
                                                        )
                                                    }
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Retirer
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="float-right inline-flex justify-center rounded-md bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-600"
                                >
                                    Fermer
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
