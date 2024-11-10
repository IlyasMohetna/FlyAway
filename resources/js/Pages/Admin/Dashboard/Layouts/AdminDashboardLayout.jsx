import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Dashboard/Sidebar/Sidebar";
import Header from "../Components/Dashboard/Header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePage } from "@inertiajs/react";

const AdminDashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <>
            <ToastContainer />

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
        </>
    );
};

export default AdminDashboardLayout;
