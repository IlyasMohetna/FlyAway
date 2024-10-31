import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import ButtonSpinner from "../../../Components/Spinners/ButtonSpinner";
import { Head, useForm } from "@inertiajs/react";
import InputLabeled from "../../../Components/Form/Pack/InputLabeled";
import { FaArrowLeftLong } from "react-icons/fa6";

function Register() {
    const [step, setStep] = useState(1); // Track current step
    const { data, setData, post, processing } = useForm({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: "",
        address_1: "",
        address_2: "",
        phone: "",
    });

    const handleNext = (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2); // Move to the next step
        } else {
            // Submit form data on the final step
            post(route("client.register"));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
                                            required
                                        />
                                    </div>
                                    <div className="md:ml-2">
                                        <InputLabeled
                                            label="Nom"
                                            id="lastname"
                                            name="lastname"
                                            type="text"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <InputLabeled
                                        label="Email Address"
                                        id="email"
                                        name="email"
                                        placeholder="user@example.com"
                                        type="email"
                                        required
                                    />
                                </div>
                                <div className="mt-6">
                                    <InputLabeled
                                        label="Mot de passe"
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                    />
                                </div>
                                <div className="mt-6">
                                    <InputLabeled
                                        label="Confirmer votre mot de passe"
                                        id="confirm_password"
                                        name="confirm_password"
                                        type="password"
                                        required
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
                                        required
                                    />
                                </div>
                                <div className="mt-6">
                                    <InputLabeled
                                        label="Adresse 2"
                                        id="address_2"
                                        name="address_2"
                                        type="text"
                                    />
                                </div>
                                <div className="mt-6">
                                    <InputLabeled
                                        label="Numero de Télephone"
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        required
                                    />
                                </div>
                            </>
                        )}

                        <div className="mt-6">
                            <span className="block w-full rounded-md shadow-sm">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                >
                                    {step === 1 ? "Suivant" : "Créer un compte"}
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
    );
}

export default Register;
