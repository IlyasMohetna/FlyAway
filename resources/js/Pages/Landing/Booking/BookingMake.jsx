import { Link, usePage, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import TransportationModes from "./Components/TransportationModes";
import LodgingOptions from "./Components/LodgingOptions";
import { CiBank } from "react-icons/ci";
import * as Yup from "yup";
import MoneyFormat from "../../../Components/Format/MoneyFormat";

function BookingMake({ apackage, transportation_modes }) {
    const { props, url } = usePage();
    const searchParams = new URLSearchParams(window.location.search);
    const { auth } = usePage().props;

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedTransportationMode, setSelectedTransportationMode] =
        useState(null);
    const [selectedLodgingOption, setSelectedLodgingOption] = useState(null);
    const [chosenPaymentMethod, setChosenPaymentMethod] =
        useState("credit_card");
    const [showError, setShowError] = useState("");
    const [nbPersons, setNbPersons] = useState(searchParams.get("nbPersons"));
    const [amountTTC, setAmountTTC] = useState(apackage.amount_ttc);

    const paymentMethods = {
        CREDIT_CARD: "credit_card",
        BANK_ACCOUNT: "bank_account",
    };

    const step1Schema = Yup.object().shape({
        transportation_mode: Yup.string().required(
            "Veuillez choisir un mode de transport."
        ),
        lodging_option: Yup.string().required(
            "Veuillez choisir une option d'hébergement."
        ),
    });

    const paymentMethodSchema = Yup.object().shape({
        payment_method: Yup.string().required(
            "Veuillez choisir une méthode de paiement."
        ),
    });

    const creditCardSchema = Yup.object().shape({
        full_name: Yup.string().required("Le nom complet est requis."),
        card_number: Yup.string()
            .matches(
                /^\d{16}$/,
                "Le numéro de carte doit comporter 16 chiffres."
            )
            .required("Le numéro de carte est requis."),
        card_expiration: Yup.string()
            .matches(
                /^(0[1-9]|1[0-2])\/(\d{2})$/,
                "La date d'expiration doit être au format MM/YY."
            )
            .required("La date d'expiration est requise."),
        cvv: Yup.string()
            .matches(/^\d{3}$/, "Le CVV doit comporter 3 chiffres.")
            .required("Le CVV est requis."),
    });

    const bankAccountSchema = Yup.object().shape({
        bic: Yup.string().required("Le BIC est requis."),
        iban: Yup.string()
            .matches(
                /^\w{15,34}$/,
                "L'IBAN doit comporter entre 15 et 34 caractères."
            )
            .required("L'IBAN est requis."),
    });

    const { data, setData, post, processing, errors, setError, clearErrors } =
        useForm({
            transportation_mode: "",
            lodging_option: "",
            payment_method: "",
            full_name: "",
            card_number: "",
            card_expiration: "",
            cvv: "",
            bic: "",
            iban: "",
        });

    const handleNextStep = async () => {
        try {
            await step1Schema.validate(
                {
                    transportation_mode: selectedTransportationMode,
                    lodging_option: selectedLodgingOption,
                },
                { abortEarly: false }
            );

            // Set form data
            setData("transportation_mode", selectedTransportationMode);
            setData("lodging_option", selectedLodgingOption);

            setCurrentStep(2);
            setShowError("");
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                setShowError(err.errors.join(" "));
            }
        }
    };

    const handleInputChange = (field, value) => {
        setData(field, value);
        let schema;
        if (chosenPaymentMethod === paymentMethods.CREDIT_CARD) {
            schema = creditCardSchema;
        } else if (chosenPaymentMethod === paymentMethods.BANK_ACCOUNT) {
            schema = bankAccountSchema;
        }

        if (schema) {
            Yup.reach(schema, field)
                .validate(value)
                .then(() => {
                    setError(field, null);
                })
                .catch((err) => {
                    setError(field, err.message);
                });
        }
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        clearErrors();
        try {
            // Set payment method in form data
            setData("payment_method", chosenPaymentMethod);

            // Validate payment method selection
            await paymentMethodSchema.validate(
                {
                    payment_method: chosenPaymentMethod,
                },
                { abortEarly: false }
            );

            if (chosenPaymentMethod === paymentMethods.CREDIT_CARD) {
                await creditCardSchema.validate(
                    {
                        full_name: data.full_name,
                        card_number: data.card_number,
                        card_expiration: data.card_expiration,
                        cvv: data.cvv,
                    },
                    { abortEarly: false }
                );
            } else if (chosenPaymentMethod === paymentMethods.BANK_ACCOUNT) {
                await bankAccountSchema.validate(
                    {
                        bic: data.bic,
                        iban: data.iban,
                    },
                    { abortEarly: false }
                );
            }

            // Submit the form
            post(route("client.package.booking.store"), {
                onSuccess: () => {
                    // Handle success (e.g., redirect to confirmation)
                },
            });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                // Map Yup errors to the errors object
                err.inner.forEach((error) => {
                    setError(error.path, error.message);
                });
                setShowError("");
            } else {
                setShowError(err.message);
            }
        }
    };

    return (
        <>
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <form
                    onSubmit={handlePaymentSubmit}
                    className="mx-auto max-w-screen-xl px-4 2xl:px-0"
                    noValidate
                >
                    <div className="py-4">
                        {currentStep === 1 && (
                            <Link
                                href={route("landing.package.show", {
                                    id: searchParams.get("package_id"),
                                })}
                                className="inline-flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                <FaArrowLeftLong />
                                <span>Retour</span>
                            </Link>
                        )}
                        {currentStep === 2 && (
                            <button
                                type="button"
                                onClick={() => setCurrentStep(1)}
                                className="inline-flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                <FaArrowLeftLong />
                                <span>Retour</span>
                            </button>
                        )}
                    </div>
                    <ol class="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                        <li class="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                            <span class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                                <svg
                                    class="me-2 h-4 w-4 sm:h-5 sm:w-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                Choix
                            </span>
                        </li>

                        <li
                            class={`after:border-1 flex items-center ${
                                currentStep == 2 && "text-primary-700"
                            } after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10`}
                        >
                            <span class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                                <svg
                                    class="me-2 h-4 w-4 sm:h-5 sm:w-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                Paiement
                            </span>
                        </li>

                        <li class="flex shrink-0 items-center">
                            <svg
                                class="me-2 h-4 w-4 sm:h-5 sm:w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            Confirmation
                        </li>
                    </ol>
                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        {currentStep === 1 && (
                            <div className="min-w-0 flex-1 space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Informations personnelles
                                    </h2>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <div>
                                                {auth.user.data.firstname}{" "}
                                                {auth.user.data.lastname}
                                            </div>
                                            <div>
                                                {auth.user.data.address_1},
                                            </div>
                                            {!!auth.user.data.address_2 && (
                                                <div>
                                                    {auth.user.data.address_2},
                                                </div>
                                            )}
                                            <div>
                                                {auth.user.data.postal_code}{" "}
                                                {auth.user.data.city}
                                            </div>
                                            <div>{auth.user.data.region}</div>
                                            <div>{auth.user.data.country}</div>
                                        </div>
                                    </div>
                                </div>
                                <TransportationModes
                                    transportation_modes={transportation_modes}
                                    setSelectedTransportationMode={
                                        setSelectedTransportationMode
                                    }
                                    selectedTransportationMode={
                                        selectedTransportationMode
                                    }
                                    package_transportations={
                                        apackage.transportations
                                    }
                                />

                                <LodgingOptions
                                    lodgingOptions={apackage.lodgings}
                                    selectedLodgingOption={
                                        selectedLodgingOption
                                    }
                                    setSelectedLodgingOption={
                                        setSelectedLodgingOption
                                    }
                                />
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="min-w-0 flex-1 space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Méthodes de paiement
                                    </h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div
                                            className={`rounded-lg border ${
                                                chosenPaymentMethod ===
                                                paymentMethods.CREDIT_CARD
                                                    ? "border-blue-500"
                                                    : "border-gray-200"
                                            } bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800`}
                                        >
                                            <div className="flex items-start">
                                                <div className="flex h-5 items-center">
                                                    <input
                                                        id="pay-with-card"
                                                        type="radio"
                                                        name="payment_method"
                                                        value={
                                                            paymentMethods.CREDIT_CARD
                                                        }
                                                        checked={
                                                            chosenPaymentMethod ===
                                                            paymentMethods.CREDIT_CARD
                                                        }
                                                        onChange={(e) =>
                                                            setChosenPaymentMethod(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="h-4 w-4 border-gray-300 bg-white text-primary-600"
                                                    />
                                                </div>
                                                <div className="ms-4 text-sm flex mt-1">
                                                    <label
                                                        htmlFor="pay-with-card"
                                                        className="font-medium leading-none text-gray-900 dark:text-white"
                                                    >
                                                        Carte bancaire
                                                    </label>
                                                    <img
                                                        src="https://mythslegendscollection.com/wp-content/uploads/2020/04/visa-mastercard-american-express-png-6.png"
                                                        className="-mt-1 ml-2 w-24"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`rounded-lg border ${
                                                chosenPaymentMethod ===
                                                paymentMethods.BANK_ACCOUNT
                                                    ? "border-blue-500"
                                                    : "border-gray-200"
                                            } bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800`}
                                        >
                                            <div className="flex items-start">
                                                <div className="flex h-5 items-center">
                                                    <input
                                                        id="pay-with-bank"
                                                        type="radio"
                                                        name="payment_method"
                                                        value={
                                                            paymentMethods.BANK_ACCOUNT
                                                        }
                                                        checked={
                                                            chosenPaymentMethod ===
                                                            paymentMethods.BANK_ACCOUNT
                                                        }
                                                        onChange={(e) =>
                                                            setChosenPaymentMethod(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="h-4 w-4 border-gray-300 bg-white text-primary-600"
                                                    />
                                                </div>
                                                <div className="ms-4 text-sm flex mt-1 space-x-2">
                                                    <label
                                                        htmlFor="pay-with-bank"
                                                        className="font-medium leading-none text-gray-900 dark:text-white"
                                                    >
                                                        Compte bancaire
                                                    </label>
                                                    <CiBank
                                                        size={20}
                                                        className="-mt-1 text-yellow-700"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {errors.payment_method && (
                                        <div className="text-red-600 text-sm font-semibold mt-2">
                                            {errors.payment_method}
                                        </div>
                                    )}

                                    {chosenPaymentMethod ===
                                        paymentMethods.CREDIT_CARD && (
                                        <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                            <div className="mb-6 grid grid-cols-2 gap-4">
                                                <div className="col-span-2 sm:col-span-1">
                                                    <label
                                                        htmlFor="full_name"
                                                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Nom complet (comme
                                                        indiqué sur la carte)*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="full_name"
                                                        value={data.full_name}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "full_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className={`block w-full rounded-lg border p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 ${
                                                            errors.full_name
                                                                ? "border-red-600"
                                                                : "border-gray-300"
                                                        }`}
                                                        placeholder="Bonnie Green"
                                                    />
                                                    {errors.full_name && (
                                                        <div className="text-red-600 text-sm font-semibold">
                                                            {errors.full_name}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-span-2 sm:col-span-1">
                                                    <label
                                                        htmlFor="card_number"
                                                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Numéro de carte*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="card_number"
                                                        value={data.card_number}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "card_number",
                                                                e.target.value
                                                            )
                                                        }
                                                        className={`block w-full rounded-lg border p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 ${
                                                            errors.card_number
                                                                ? "border-red-600"
                                                                : "border-gray-300"
                                                        }`}
                                                        placeholder="xxxx-xxxx-xxxx-xxxx"
                                                    />
                                                    {errors.card_number && (
                                                        <div className="text-red-600 text-sm font-semibold">
                                                            {errors.card_number}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="card_expiration"
                                                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Date d'expiration*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="card_expiration"
                                                        value={
                                                            data.card_expiration
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "card_expiration",
                                                                e.target.value
                                                            )
                                                        }
                                                        className={`block w-full rounded-lg border p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 ${
                                                            errors.card_expiration
                                                                ? "border-red-600"
                                                                : "border-gray-300"
                                                        }`}
                                                        placeholder="11/24"
                                                    />
                                                    {errors.card_expiration && (
                                                        <div className="text-red-600 text-sm font-semibold">
                                                            {
                                                                errors.card_expiration
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="cvv"
                                                        className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        CVV*
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="cvv"
                                                        value={data.cvv}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "cvv",
                                                                e.target.value
                                                            )
                                                        }
                                                        className={`block w-full rounded-lg border p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 ${
                                                            errors.cvv
                                                                ? "border-red-600"
                                                                : "border-gray-300"
                                                        }`}
                                                        placeholder="•••"
                                                    />
                                                    {errors.cvv && (
                                                        <div className="text-red-600 text-sm font-semibold">
                                                            {errors.cvv}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {chosenPaymentMethod ===
                                        paymentMethods.BANK_ACCOUNT && (
                                        <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                            <p className="pb-2 mb-4 text-black">
                                                * Merci de saisir vos
                                                coordonnées bancaires BIC/IBAN,
                                                pour le prélèvement automatique
                                            </p>
                                            <div className="mb-6 grid grid-cols-2 gap-4">
                                                <div className="col-span-2 sm:col-span-1">
                                                    <label
                                                        htmlFor="bic"
                                                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        BIC
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="bic"
                                                        value={data.bic}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "bic",
                                                                e.target.value
                                                            )
                                                        }
                                                        className={`block w-full rounded-lg border p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 ${
                                                            errors.bic
                                                                ? "border-red-600"
                                                                : "border-gray-300"
                                                        }`}
                                                    />
                                                    {errors.bic && (
                                                        <div className="text-red-600 text-sm font-semibold">
                                                            {errors.bic}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-span-2">
                                                    <label
                                                        htmlFor="iban"
                                                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        IBAN
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="iban"
                                                        value={data.iban}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "iban",
                                                                e.target.value
                                                            )
                                                        }
                                                        className={`block w-full rounded-lg border p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 ${
                                                            errors.iban
                                                                ? "border-red-600"
                                                                : "border-gray-300"
                                                        }`}
                                                    />
                                                    {errors.iban && (
                                                        <div className="text-red-600 text-sm font-semibold">
                                                            {errors.iban}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Sidebar with totals and button */}
                        <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                            <div className="flow-root">
                                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                            Prix unitaire
                                        </dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                                            <MoneyFormat money={amountTTC} />
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                            Quantité
                                        </dt>
                                        <dd className="text-base font-medium text-green-500">
                                            {nbPersons}
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                            Taxes
                                        </dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                                            Prix TTC
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-bold text-gray-900 dark:text-white">
                                            Total
                                        </dt>
                                        <dd className="text-base font-bold text-gray-900 dark:text-white">
                                            <MoneyFormat
                                                money={nbPersons * amountTTC}
                                            />
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {currentStep === 1 && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={handleNextStep}
                                            className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none"
                                        >
                                            Procéder au paiement
                                        </button>

                                        {showError && (
                                            <div className="text-red-600 text-sm font-semibold">
                                                {showError}
                                            </div>
                                        )}
                                    </>
                                )}
                                {currentStep === 2 && (
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none"
                                    >
                                        Payer
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
}

export default BookingMake;
