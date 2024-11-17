import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationLink from "../Components/Dashboard/Header/NavigationLink";
import { Link, router, usePage } from "@inertiajs/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const UserDashboardLayout = ({ children, title }) => {
    const { auth, currentRoute } = usePage().props;
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleLogout = () => {
        router.visit(route("client.logout.action"), {
            method: "post",
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <img
                                        src="/assets/img/logo.svg"
                                        className="size-16"
                                    />
                                </div>
                                <div>
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        <NavigationLink
                                            href={route(
                                                "client.dashboard.bookings.show"
                                            )}
                                            active={currentRoute === ""}
                                        >
                                            Mes réservations
                                        </NavigationLink>
                                        <NavigationLink
                                            href="/fidelite"
                                            active={currentRoute === "fidelite"}
                                        >
                                            Programme de fidélité
                                        </NavigationLink>
                                        <NavigationLink
                                            href={route(
                                                "client.dashboard.payments.show"
                                            )}
                                            active={
                                                currentRoute ===
                                                route(
                                                    "client.dashboard.payments.show"
                                                )
                                            }
                                        >
                                            Mes paiements
                                        </NavigationLink>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ml-4 flex items-center md:ml-6">
                                    <button
                                        type="button"
                                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">
                                            View notifications
                                        </span>
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm outline-none">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">
                                                    Open user menu
                                                </span>
                                                <img
                                                    alt=""
                                                    src={
                                                        "https://ui-avatars.com/api/?name=" +
                                                        auth.user.data
                                                            .firstname +
                                                        "Doe&size=128"
                                                    }
                                                    className="size-8 rounded-full"
                                                />
                                                <p className="ml-3 text-white">
                                                    {auth.user.data.firstname}{" "}
                                                    {auth.user.data.lastname}
                                                </p>
                                            </MenuButton>
                                        </div>
                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                        >
                                            <MenuItem>
                                                <Link
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                                >
                                                    Mon profile
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <Link
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                                >
                                                    Paramètre
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <button
                                                    onClick={handleLogout}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                                >
                                                    Se déconnecter
                                                </button>
                                            </MenuItem>
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>
                </Disclosure>

                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            {title}
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto px-4">{children}</div>
                </main>
            </div>
        </>
    );
};

export default UserDashboardLayout;
