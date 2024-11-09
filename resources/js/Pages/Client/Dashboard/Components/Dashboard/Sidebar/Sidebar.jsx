// Sidebar.jsx
import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { FaHome, FaUser, FaCog, FaAngleDown } from "react-icons/fa";
import MenuItemStandlone from "./MenuItemStandlone";
import AccordionMenu from "./AccordionMenu";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const [openMenu, setOpenMenu] = useState(null);

    const handleToggle = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <div
            className={`fixed inset-y-0 left-0 z-30 w-64 transform ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-lg`}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4 py-4 text-white border-b border-gray-700 border-1">
                <h2>Hi</h2>
            </div>

            <nav className="p-4 space-y-4">
                <MenuItemStandlone
                    href="/"
                    title="Accueil"
                    icon={
                        <FaHome className="mr-3 text-gray-400 hover:text-white" />
                    }
                />

                <AccordionMenu
                    title={"Account"}
                    icon={
                        <FaHome className="mr-3 text-gray-400 hover:text-white" />
                    }
                    isOpen={openMenu === "account"}
                    onToggle={() => handleToggle("account")}
                >
                    <MenuItemStandlone
                        href="/"
                        title="Profile"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href="/"
                        title="Settings"
                        forAccordion={true}
                    />
                </AccordionMenu>

                <AccordionMenu
                    title={"Me"}
                    icon={
                        <FaHome className="mr-3 text-gray-400 hover:text-white" />
                    }
                    isOpen={openMenu === "settings"}
                    onToggle={() => handleToggle("settings")}
                >
                    <MenuItemStandlone
                        href="/"
                        title="Accueil"
                        forAccordion={true}
                    />
                </AccordionMenu>
            </nav>
        </div>
    );
};

export default Sidebar;
