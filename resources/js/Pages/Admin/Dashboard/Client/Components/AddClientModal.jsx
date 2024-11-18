import React, { useState, Fragment, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import AdminDashboardLayout from "../../Layouts/AdminDashboardLayout";
import InputLabeled from "../../../../../Components/Form/Pack/InputLabeled";
import CascadingSelect from "../../../../../Components/Location/CascadingSelect";
import { Dialog, Transition } from "@headlessui/react";

function AddClientModal({ open, setOpen, countries }) {
    const {
        post,
        data,
        setData,
        processing,
        errors: serverErrors,
    } = useForm({
        firstname: "",
        lastname: "",
        email: "",
        address_1: "",
        address_2: "",
        country_id: "",
        region_id: "",
        city_id: "",
        phone: "",
    });

    const [clientErrors, setClientErrors] = useState({});

    const handleInputChange = (key, value) => {
        setData(key, value);

        // Remove the error for the field being updated
        setClientErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[key];
            return newErrors;
        });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!data.firstname) newErrors.firstname = "Prénom est requis";
        if (!data.lastname) newErrors.lastname = "Nom est requis";
        if (!data.email) {
            newErrors.email = "Email est requis";
        } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(
                data.email
            )
        ) {
            newErrors.email = "Adresse email invalide";
        }
        if (!data.address_1) newErrors.address_1 = "Adresse 1 est requise";
        if (!data.phone) {
            newErrors.phone = "Numéro de téléphone est requis";
        } else if (!/^\d+$/.test(data.phone)) {
            newErrors.phone = "Numéro de téléphone invalide";
        }
        if (!data.country_id) newErrors.country_id = "Sélectionnez un pays";
        if (!data.region_id) newErrors.region_id = "Sélectionnez une région";
        if (!data.city_id) newErrors.city_id = "Sélectionnez une ville";

        setClientErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            post(route("admin.clients.store"), {
                preserveScroll: true,
                onSuccess: () => setOpen(false),
                onError: () => console.log("Erreur lors de la soumission."),
            });
        }
    };

    const displayError = (field) => clientErrors[field] || serverErrors[field];

    return (
        <>
            <Transition appear show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 bg-opacity-30"
                    onClose={() => setOpen(false)}
                >
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Ajouter un Client
                                </Dialog.Title>
                                <form className="mt-4" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-2 gap-6">
                                        <InputLabeled
                                            label="Prénom"
                                            name="firstname"
                                            type="text"
                                            value={data.firstname}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "firstname",
                                                    e.target.value
                                                )
                                            }
                                            error={displayError("firstname")}
                                        />

                                        <InputLabeled
                                            label="Nom"
                                            name="lastname"
                                            type="text"
                                            value={data.lastname}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "lastname",
                                                    e.target.value
                                                )
                                            }
                                            error={displayError("lastname")}
                                        />
                                    </div>

                                    <InputLabeled
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        error={displayError("email")}
                                    />

                                    <InputLabeled
                                        label="Adresse 1"
                                        name="address_1"
                                        type="text"
                                        value={data.address_1}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "address_1",
                                                e.target.value
                                            )
                                        }
                                        error={displayError("address_1")}
                                    />

                                    <InputLabeled
                                        label="Adresse 2"
                                        name="address_2"
                                        type="text"
                                        value={data.address_2}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "address_2",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputLabeled
                                        label="Numéro de téléphone"
                                        name="phone"
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "phone",
                                                e.target.value
                                            )
                                        }
                                        error={displayError("phone")}
                                    />

                                    <CascadingSelect
                                        data={data}
                                        setData={setData}
                                        handleInputChange={handleInputChange}
                                        countries={countries}
                                        errors={{
                                            country: displayError("country_id"),
                                            region: displayError("region_id"),
                                            city: displayError("city_id"),
                                        }}
                                    />
                                    <br></br>
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "En cours..."
                                            : "Créer le client"}
                                    </button>
                                </form>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

AddClientModal.layout = (page) => <AdminDashboardLayout children={page} />;

export default AddClientModal;
