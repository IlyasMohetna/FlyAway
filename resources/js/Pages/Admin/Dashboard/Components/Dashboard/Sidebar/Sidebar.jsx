// Sidebar.jsx
import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { FaHome, FaUser, FaCog, FaAngleDown } from "react-icons/fa";
import MenuItemStandlone from "./MenuItemStandlone";
import AccordionMenu from "./AccordionMenu";
import { MdOutlineTravelExplore } from "react-icons/md";
import { FaTrain, FaPlane, FaHotel, FaCar, FaBusAlt } from "react-icons/fa";

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
                <h2>FlyAway Admin</h2>
            </div>

            <nav className="p-4 space-y-2">
                <MenuItemStandlone
                    href="/"
                    title="Accueil"
                    icon={
                        <FaHome className="mr-3 text-gray-400 hover:text-white" />
                    }
                />

                <AccordionMenu
                    title={"Hébergement"}
                    icon={
                        <FaHotel className="mr-3 text-gray-400 hover:text-white" />
                    }
                    isOpen={openMenu === "Hébergement"}
                    onToggle={() => handleToggle("Hébergement")}
                >
                    <MenuItemStandlone
                        href={route("lodging.index")}
                        title="Liste des hébergements"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href="/"
                        title="Ajouter un hébergement"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href={route("lodging.type")}
                        title="Type d'hébergement"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href="/"
                        title="Equipement de chambre"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href={route("lodging.attribut")}
                        title="Attribut d'hébérgement"
                        forAccordion={true}
                    />
                </AccordionMenu>

                <AccordionMenu
                    title={"Forfait"}
                    icon={
                        <MdOutlineTravelExplore className="mr-3 text-gray-400 hover:text-white" />
                    }
                    isOpen={openMenu === "Forfait"}
                    onToggle={() => handleToggle("Forfait")}
                >
                    <MenuItemStandlone
                        href="/"
                        title="Liste des forfaits"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href="/"
                        title="Ajouter un forfait"
                        forAccordion={true}
                    />
                </AccordionMenu>

                <AccordionMenu
                    title={"Bus"}
                    icon={
                        <FaBusAlt className="mr-3 text-gray-400 hover:text-white" />
                    }
                    isOpen={openMenu === "Bus"}
                    onToggle={() => handleToggle("Bus")}
                >
                    <MenuItemStandlone
                        href="/"
                        title="Ligne de bus"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href="/"
                        title="Station de bus"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href="/"
                        title="Type de passagers"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href="/"
                        title="Compagnies de bus"
                        forAccordion={true}
                    />
                </AccordionMenu>

                <AccordionMenu
                    title={"Train"}
                    icon={
                        <FaTrain className="mr-3 text-gray-400 hover:text-white" />
                    }
                    isOpen={openMenu === "Train"}
                    onToggle={() => handleToggle("Train")}
                >
                    <MenuItemStandlone
                        href="/"
                        title="Ligne de train"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href="/"
                        title="Station de train"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href="/"
                        title="Type de sièges"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href="/"
                        title="Compagnies de train"
                        forAccordion={true}
                    />
                </AccordionMenu>

                <AccordionMenu
                    title={"Avion"}
                    icon={
                        <FaPlane className="mr-3 text-gray-400 hover:text-white" />
                    }
                    isOpen={openMenu === "Avion"}
                    onToggle={() => handleToggle("Avion")}
                >
                    <MenuItemStandlone
                        href="/"
                        title="Ligne d'avion"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href="/"
                        title="Airoports"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href="/"
                        title="Type d'experiences"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href="/"
                        title="Type de passagers"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href="/"
                        title="Type de sièges"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href="/"
                        title="Compagnies aériennes"
                        forAccordion={true}
                    />
                </AccordionMenu>

                <AccordionMenu
                    title={"Voiture de location"}
                    icon={
                        <FaCar className="mr-3 text-gray-400 hover:text-white" />
                    }
                    isOpen={openMenu === "Voiture de location"}
                    onToggle={() => handleToggle("Voiture de location")}
                >
                    <MenuItemStandlone
                        href="/"
                        title="Voitures"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href="/"
                        title="Agence de location"
                        forAccordion={true}
                    />
                    <MenuItemStandlone
                        href="/"
                        title="Caractéristique de voiture"
                        forAccordion={true}
                    />
                </AccordionMenu>
            </nav>
        </div>
    );
};

export default Sidebar;
