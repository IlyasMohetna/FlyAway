import { Link, usePage } from "@inertiajs/react";
import React from "react";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";

export default function Header() {
    const { auth } = usePage().props;

    return (
        <>
            <header>
                <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <a
                            href="https://flowbite.com"
                            class="flex items-center"
                        >
                            <img
                                src="/assets/img/logo.svg"
                                class="mr-3 w-20 md:w-16 lg:w-20 xl:w-24"
                                alt="Flowbite Logo"
                            />
                        </a>
                        <div class="flex items-center lg:order-2">
                            {auth.user?.data && !auth.user?.data.employe ? (
                                <>
                                    <Link
                                        as="button"
                                        href={route(
                                            "client.dashboard.bookings.show"
                                        )}
                                    >
                                        <PrimaryButton label={"Mon compte"} />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route("client.login.show")}
                                        class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                                    >
                                        Se connecter
                                    </Link>
                                    <Link
                                        href={route("client.register.show")}
                                        class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                    >
                                        Créer un compte
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
