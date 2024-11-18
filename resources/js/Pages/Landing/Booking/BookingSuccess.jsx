import { Link } from "@inertiajs/react";
import React from "react";
import Header from "../Components/Header";

function BookingSuccess({ success }) {
    return (
        <>
            <Header />
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                        <div class="mx-auto max-w-2xl px-4 2xl:px-0 space-y-8">
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
                                        Paiement
                                    </span>
                                </li>

                                <li class="flex shrink-0 items-center text-primary-700">
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
                            <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
                                Merci pour votre réservation !
                            </h2>
                            <p class="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
                                Votre réservation
                                <a
                                    href="#"
                                    class="font-medium text-gray-900 dark:text-white hover:underline"
                                >
                                    #7564804
                                </a>{" "}
                                a été confirmée avec succès. Vous aurez accès à
                                plus d'instructions sur votre espace client.
                            </p>

                            <div class="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
                                <dl class="sm:flex items-center justify-between gap-4">
                                    <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                                        Date
                                    </dt>
                                    <dd class="font-medium text-gray-900 dark:text-white sm:text-end">
                                        {success.date}
                                    </dd>
                                </dl>
                                <dl class="sm:flex items-center justify-between gap-4">
                                    <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                                        Méthode de paiement
                                    </dt>
                                    <dd class="font-medium text-gray-900 dark:text-white sm:text-end">
                                        {success.payment_method ==
                                        "AppModelsPAYMENTBankAccount"
                                            ? "Compte bancaire"
                                            : "Carte bancaire"}
                                    </dd>
                                </dl>
                                <dl class="sm:flex items-center justify-between gap-4">
                                    <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                                        Nom
                                    </dt>
                                    <dd class="font-medium text-gray-900 dark:text-white sm:text-end">
                                        {success.name}
                                    </dd>
                                </dl>
                                <dl class="sm:flex items-center justify-between gap-4">
                                    <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                                        Adresse
                                    </dt>
                                    <dd class="font-medium text-gray-900 dark:text-white sm:text-end">
                                        {success.address}
                                    </dd>
                                </dl>
                                <dl class="sm:flex items-center justify-between gap-4">
                                    <dt class="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                                        Phone
                                    </dt>
                                    <dd class="font-medium text-gray-900 dark:text-white sm:text-end">
                                        {success.phone}
                                    </dd>
                                </dl>
                            </div>
                            <div class="flex items-center space-x-4">
                                <Link
                                    href={route(
                                        "client.dashboard.bookings.show"
                                    )}
                                    class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                >
                                    Voir ma réservation
                                </Link>

                                <Link
                                    href={route("landing.package.search.index")}
                                    class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    Revenir aux forfaits
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
}

export default BookingSuccess;
