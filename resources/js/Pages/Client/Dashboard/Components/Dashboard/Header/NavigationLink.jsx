import React from "react";
import { Link } from "@inertiajs/react";

const NavigationLink = ({ href, children, active }) => {
    const activeClass =
        "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium";
    const inactiveClass =
        "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium";

    return (
        <Link href={href} className={active ? activeClass : inactiveClass}>
            {children}
        </Link>
    );
};

export default NavigationLink;
