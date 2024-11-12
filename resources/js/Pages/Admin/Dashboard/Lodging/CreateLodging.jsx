import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout";
import InputLabeled from "../../../../Components/Form/Pack/InputLabeled";
import DynamicSelect from "./Components/Form/DynamicSelect";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Label from "../../../../Components/Form/Labels/Label";
import StarRatingSelect from "./Components/Form/StarRatingSelect";

function CreateLodging({ categories }) {
    const {
        post,
        data,
        setData,
        processing,
        errors: serverErrors,
    } = useForm({
        name: "",
        type_lodging_id: null,
        real_city_id: null,
        link_city_id: null,
        description: "",
        address1: "",
        address2: "",
        email: "",
        phone: "",
        check_in: "",
        check_out: "",
        attributs: [],
        star_rating: 1,
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

    const handleCheckboxChange = (attributId) => {
        const updatedAttributs = data.attributs.includes(attributId)
            ? data.attributs.filter((id) => id !== attributId)
            : [...data.attributs, attributId];
        setData("attributs", updatedAttributs);
    };

    const validateForm = () => {
        let newErrors = {};
        if (!data.name) {
            newErrors.name = "Le titre de l'annonce est obligatoire.";
        }
        if (!data.type_lodging_id) {
            newErrors.type_lodging_id =
                "Veuillez sélectionner un type de logement.";
        }
        if (!data.real_city_id) {
            newErrors.real_city_id = "Veuillez sélectionner une ville réelle.";
        }
        if (!data.link_city_id) {
            newErrors.link_city_id =
                "Veuillez sélectionner une ville de rattachement.";
        }
        if (!data.description) {
            newErrors.description = "La description est obligatoire.";
        }
        if (!data.address1) {
            newErrors.address1 = "L'adresse 1 est obligatoire.";
        }
        if (!data.email) {
            newErrors.email = "L'email est obligatoire.";
        } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(
                data.email
            )
        ) {
            newErrors.email = "L'email n'est pas valide.";
        }
        if (!data.phone) {
            newErrors.phone = "Le numéro de téléphone est obligatoire.";
        } else if (!/^\d{10}$/.test(data.phone)) {
            newErrors.phone =
                "Le numéro de téléphone doit contenir 10 chiffres.";
        }
        if (!data.check_in) {
            newErrors.check_in = "L'heure de check-in est obligatoire.";
        }
        if (!data.check_out) {
            newErrors.check_out = "L'heure de check-out est obligatoire.";
        }

        setClientErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            post(route("lodging.store"), {
                preserveScroll: true,
                onError: () =>
                    console.log("Erreur lors de la soumission du formulaire."),
            });
        } else {
            console.log("Formulaire invalide, vérifier les erreurs.");
        }
    };

    const displayError = (field) => {
        return clientErrors[field] || serverErrors[field] || "";
    };

    return (
        <div className="container mx-auto p-6">
            <div
                className="flex relative w-full break-words flex-col card p-6 dark:shadow-dark-md mb-6 py-4 bg-lightinfo dark:bg-darkinfo overflow-hidden rounded-md border-none shadow-none dark:shadow-none"
                style={{ borderRadius: 7 }}
            >
                <div className="flex h-full flex-col justify-start gap-0 p-0">
                    <div className="items-center grid grid-cols-12 gap-6">
                        <div className="col-span-9">
                            <h4 className="font-semibold text-xl text-dark dark:text-white mb-3">
                                Ajouter un logement
                            </h4>
                        </div>
                    </div>
                </div>
            </div>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-14">
                    <div className="col-span-8">
                        <div className="w-full bg-white rounded-lg shadow md:mt-0 xl:p-0 mb-4">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <div className="w-1/2 space-y-4">
                                    <div>
                                        <StarRatingSelect
                                            rating={data.star_rating}
                                            setRating={(value) =>
                                                handleInputChange(
                                                    "star_rating",
                                                    value
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <InputLabeled
                                            label="Titre de l'annonce"
                                            name="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            error={displayError("name")}
                                        />
                                    </div>

                                    <div>
                                        <DynamicSelect
                                            label="Type du logement"
                                            name="type_lodging_id"
                                            selectedValue={data.type_lodging_id}
                                            handleInputChange={
                                                handleInputChange
                                            }
                                            fetchRoute={route(
                                                "lodging.type.select"
                                            )}
                                            errors={serverErrors}
                                            noOptionsMessage="Veuillez choisir un type du logement !"
                                            placeholder="Selectionner une option"
                                        />
                                    </div>
                                </div>

                                <hr></hr>

                                <div>
                                    <Label text={"Description"} />
                                    <ReactQuill
                                        theme="snow"
                                        value={data.description}
                                        onChange={(value) =>
                                            handleInputChange(
                                                "description",
                                                value
                                            )
                                        }
                                        placeholder="Écrivez la description ici..."
                                        className="h-full"
                                    />
                                    {displayError("description") && (
                                        <div className="text-red-500 text-sm mt-2">
                                            {displayError("description")}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="w-full bg-white rounded-lg shadow md:mt-0 xl:p-0 mb-4">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-12">
                                        <div>
                                            <InputLabeled
                                                label="Adresse 1"
                                                name="address1"
                                                type="text"
                                                value={data.address1}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "address1",
                                                        e.target.value
                                                    )
                                                }
                                                error={displayError("address1")}
                                            />
                                        </div>

                                        <div>
                                            <InputLabeled
                                                label="Adresse 2"
                                                name="address2"
                                                type="text"
                                                value={data.address2}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "address2",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div>
                                            <DynamicSelect
                                                label="Ville réelle"
                                                name="real_city_id"
                                                selectedValue={
                                                    data.real_city_id
                                                }
                                                handleInputChange={
                                                    handleInputChange
                                                }
                                                fetchRoute={route(
                                                    "select.city"
                                                )}
                                                errors={serverErrors}
                                                noOptionsMessage="Veuillez sélectionner une ville !"
                                                placeholder="Sélectionner une option"
                                            />
                                        </div>

                                        <div>
                                            <DynamicSelect
                                                label="Ville de rattachement"
                                                name="link_city_id"
                                                selectedValue={
                                                    data.link_city_id
                                                }
                                                handleInputChange={
                                                    handleInputChange
                                                }
                                                fetchRoute={route(
                                                    "select.city"
                                                )}
                                                errors={serverErrors}
                                                noOptionsMessage="Veuillez sélectionner une ville !"
                                                placeholder="Sélectionner une option"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full bg-white rounded-lg shadow md:mt-0 xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-12">
                                        <div>
                                            <InputLabeled
                                                label="Email"
                                                name="email"
                                                type="text"
                                                value={data.email}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                error={displayError("email")}
                                            />
                                        </div>

                                        <div>
                                            <InputLabeled
                                                label="Téléphone"
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
                                        </div>

                                        <div>
                                            <InputLabeled
                                                label="Check-in"
                                                name="check_in"
                                                type="time"
                                                value={data.check_in}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "check_in",
                                                        e.target.value
                                                    )
                                                }
                                                error={displayError("check_in")}
                                            />
                                        </div>

                                        <div>
                                            <InputLabeled
                                                label="Check-out"
                                                name="check_out"
                                                type="time"
                                                value={data.check_out}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "check_out",
                                                        e.target.value
                                                    )
                                                }
                                                error={displayError(
                                                    "check_out"
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div></div>
                            <div className="mt-4 float-right w-1/4 mr-12">
                                <button
                                    type="submit"
                                    className="w-full justify-center text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                                    disabled={processing}
                                >
                                    {processing ? "En cours..." : "Enregistrer"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="w-full bg-white rounded-lg shadow md:mt-0 xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <div className="grid grid-cols-1 gap-12">
                                    {categories.map((category, index) => {
                                        return (
                                            <div key={index}>
                                                <Label
                                                    text={
                                                        "Catégorie : " +
                                                        category.name
                                                    }
                                                />
                                                {category.attribut.map(
                                                    (attribut, attrIndex) => {
                                                        return (
                                                            <div
                                                                key={attrIndex}
                                                                className="mt-2"
                                                            >
                                                                <div className="flex items-center me-4">
                                                                    <input
                                                                        name="attributs[]"
                                                                        id={`checkbox-${index}-${attrIndex}`}
                                                                        type="checkbox"
                                                                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleCheckboxChange(
                                                                                attribut.id
                                                                            )
                                                                        }
                                                                    />
                                                                    <label
                                                                        htmlFor={`checkbox-${index}-${attrIndex}`}
                                                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                                    >
                                                                        {
                                                                            attribut.name
                                                                        }
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

CreateLodging.layout = (page) => <AdminDashboardLayout children={page} />;

export default CreateLodging;
