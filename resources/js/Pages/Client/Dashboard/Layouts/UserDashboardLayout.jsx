// UserDashboardLayout.jsx
import React from "react";

const UserDashboardLayout = ({ children }) => {
    return (
        <div>
            {/* Mobile sidebar */}
            <div
                className="fixed inset-0 flex z-40 md:hidden"
                role="dialog"
                aria-modal="true"
            >
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-75"
                    aria-hidden="true"
                ></div>
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-indigo-700">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            type="button"
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <span className="sr-only">Close sidebar</span>
                            <svg
                                className="h-6 w-6 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-shrink-0 flex items-center px-4"></div>
                        <nav className="mt-5 px-2 space-y-1">
                            <SidebarLink
                                href="#"
                                title="Dashboard"
                                icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                            <SidebarLink
                                href="#"
                                title="Team"
                                icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                            <SidebarLink
                                href="#"
                                title="Projects"
                                icon="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                            />
                            <SidebarLink
                                href="#"
                                title="Calendar"
                                icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                            <SidebarLink
                                href="#"
                                title="Documents"
                                icon="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                            <SidebarLink
                                href="#"
                                title="Reports"
                                icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-indigo-800 p-4">
                        <UserProfile name="Tom Cook" />
                    </div>
                </div>
                <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-indigo-700">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4"></div>
                    <nav className="mt-5 flex-1 px-2 space-y-1">
                        <SidebarLink
                            href="#"
                            title="Dashboard"
                            icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                        {/* Add more SidebarLinks here as needed */}
                    </nav>
                </div>
                <UserProfile name="Tom Cook" />
            </div>

            <div className="md:pl-64 flex flex-col flex-1">
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
};

// SidebarLink Component
const SidebarLink = ({ href, title, icon }) => (
    <a
        href={href}
        className="text-white hover:bg-indigo-600 hover:bg-opacity-75 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
    >
        <svg
            className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={icon}
            />
        </svg>
        {title}
    </a>
);

// UserProfile Component
const UserProfile = ({ name }) => (
    <div className="flex items-center p-4">
        <img
            className="inline-block h-9 w-9 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
        />
        <div className="ml-3">
            <p className="text-sm font-medium text-white">{name}</p>
            <p className="text-xs font-medium text-indigo-200 group-hover:text-white">
                View profile
            </p>
        </div>
    </div>
);

export default UserDashboardLayout;
