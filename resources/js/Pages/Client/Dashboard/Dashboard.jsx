import { usePage } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import UserDashboardLayout from "./Layouts/UserDashboardLayout";

const UserDashboard = () => {
    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    return (
        <>
            <ToastContainer />
            <div>index</div>
        </>
    );
};

UserDashboard.layout = (page) => (
    <UserDashboardLayout>{page}</UserDashboardLayout>
);

export default UserDashboard;
