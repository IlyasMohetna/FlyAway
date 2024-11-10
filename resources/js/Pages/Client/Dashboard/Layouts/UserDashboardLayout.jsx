// UserDashboardLayout.jsx
import { usePage } from "@inertiajs/react";
import React, { useState } from "react";
import Sidebar from "../Components/Dashboard/Sidebar/Sidebar";
import Header from "../Components/Dashboard/Header/Header";

const UserDashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex h-screen overflow-hidden">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <div
                    className={`relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden transition-all duration-300 ${
                        sidebarOpen ? "ml-64" : "ml-0"
                    }`}
                >
                    <Header />
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default UserDashboardLayout;
