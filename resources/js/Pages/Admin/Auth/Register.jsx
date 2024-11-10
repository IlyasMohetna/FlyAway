import React, { useEffect, useState } from "react";
import { Link, Head, useForm, usePage } from "@inertiajs/react";
import * as Yup from "yup";
import ButtonSpinner from "../../../Components/Spinners/ButtonSpinner";
import InputLabeled from "../../../Components/Form/Pack/InputLabeled";
import CascadingSelect from "../../../Components/Location/CascadingSelect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaArrowLeftLong } from "react-icons/fa6";

// Validation schemas for each step
const stepValidations = [
    Yup.object().shape({
        firstname: Yup.string().required("Prénom est requis"),
        lastname: Yup.string().required("Nom est requis"),
        email: Yup.string()
            .email("Adresse email invalide")
            .required("Email est requis"),
        password: Yup.string()
            .min(8, "Mot de passe doit être de 8 caractères minimum")
            .required("Mot de passe est requis"),
        confirm_password: Yup.string()
            .oneOf(
                [Yup.ref("password"), null],
                "Les mots de passe ne correspondent pas"
            )
            .required("Confirmation du mot de passe est requise"),
    }),
    Yup.object().shape({
        address_1: Yup.string().required("Adresse 1 est requise"),
        phone: Yup.string().required("Numéro de téléphone est requis"),
        country_id: Yup.string()
            .required("Sélectionnez un pays")
            .test(
                "is-valid-id",
                "Sélectionnez un pays valide",
                (value) => value !== ""
            ),
        region_id: Yup.string()
            .required("Sélectionnez une région")
            .test(
                "is-valid-id",
                "Sélectionnez une région valide",
                (value) => value !== ""
            ),
        city_id: Yup.string()
            .required("Sélectionnez une ville")
            .test(
                "is-valid-id",
                "Sélectionnez une ville valide",
                (value) => value !== ""
            ),
    }),
];

function Register() {
    // Inertia.on("invalid", (event) => {
    //     if (!toast.isActive("validation-error")) {
    //         toast.error(
    //             "Une erreur s'est produite lors de la création de votre compte!",
    //             {
    //                 toastId: "validation-error",
    //             }
    //         );
    //     }
    //     event.preventDefault();
    // });
    const { countries } = usePage().props; // Get countries data from the backend
    const [step, setStep] = useState(1);
    const { data, setData, post, processing } = useForm({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: "",
        address_1: "",
        address_2: "",
        country_id: "", // Add country_id here
        region_id: "", // Add region_id here
        city_id: "", // Add city_id here
        phone: "",
    });
    const [clientErrors, setClientErrors] = useState({});
    const { errors: serverErrors } = usePage().props;

    // Handle form submission for the current step
    const handleNext = async (e) => {
        e.preventDefault();

        try {
            // Validate data for the current step
            await stepValidations[step - 1].validate(data, {
                abortEarly: false,
            });

            setClientErrors({});
            if (step === 1) {
                setStep(2);
            } else {
                // Post data on final step
                post(route("client.register.action"));
            }
        } catch (validationErrors) {
            console.log(validationErrors);
            const formattedErrors = {};
            validationErrors.inner.forEach((error) => {
                formattedErrors[error.path] = error.message;
            });
            setClientErrors(formattedErrors);
        }
    };

    // Display errors from both client and server validations
    const displayError = (field) => clientErrors[field] || serverErrors[field];

    // Update data and clear specific field error on change
    const handleInputChange = (field, value) => {
        setData(field, value);
        if (clientErrors[field]) {
            setClientErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <Head title="Register" />
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Créer votre compte FlyAway
                    </h2>
                    <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                        <Link
                            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                            href={route("client.login.show")}
                        >
                            Connecter vous
                        </Link>
                    </p>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 rounded-lg">
                        <form onSubmit={handleNext} autoComplete="off">
                            {step === 1 && (
                                <>
                                    <div className="mb-4 md:flex md:justify-around">
                                        <div className="mb-4 md:mr-2 md:mb-0">
                                            <InputLabeled
                                                label="Prénom"
                                                id="firstname"
                                                name="firstname"
                                                type="text"
                                                value={data.firstname}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "firstname",
                                                        e.target.value
                                                    )
                                                }
                                                error={displayError(
                                                    "firstname"
                                                )}
                                            />
                                        </div>

                                        <div className="md:ml-2">
                                            <InputLabeled
                                                label="Nom"
                                                id="lastname"
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
                                    </div>
                                    <div className="mt-6">
                                        <InputLabeled
                                            label="Email Address"
                                            id="email"
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

                                    <div className="mt-6">
                                        <InputLabeled
                                            label="Mot de passe"
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            error={displayError("password")}
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <InputLabeled
                                            label="Confirmer votre mot de passe"
                                            id="confirm_password"
                                            name="confirm_password"
                                            type="password"
                                            value={data.confirm_password}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "confirm_password",
                                                    e.target.value
                                                )
                                            }
                                            error={displayError(
                                                "confirm_password"
                                            )}
                                        />
                                    </div>
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <div className="mt-6">
                                        <InputLabeled
                                            label="Adresse 1"
                                            id="address_1"
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
                                    </div>
                                    <div className="mt-6">
                                        <InputLabeled
                                            label="Adresse 2"
                                            id="address_2"
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
                                    </div>

                                    <div className="mt-6">
                                        <CascadingSelect
                                            data={data}
                                            setData={setData}
                                            handleInputChange={
                                                handleInputChange
                                            } // Pass handleInputChange here
                                            countries={countries}
                                            errors={{
                                                country:
                                                    displayError("country_id"),
                                                region: displayError(
                                                    "region_id"
                                                ),
                                                city: displayError("city_id"),
                                            }}
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <InputLabeled
                                            label="Numero de Télephone"
                                            id="phone"
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
                                </>
                            )}
                            <div className="mt-6">
                                <span className="block w-full rounded-md shadow-sm">
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <ButtonSpinner />
                                        ) : step === 1 ? (
                                            "Suivant"
                                        ) : (
                                            "Créer un compte"
                                        )}
                                    </button>
                                </span>
                            </div>
                            {step === 2 && (
                                <div className="mt-2">
                                    <span className="block w-full rounded-md shadow-sm">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                        >
                                            <FaArrowLeftLong className="mr-2" />
                                            <span>Retour</span>
                                        </button>
                                    </span>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
