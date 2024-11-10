import React from "react";
import { FaAngleDown } from "react-icons/fa";

const AccordionMenu = ({ title, icon, isOpen, onToggle, children }) => {
    return (
        <div>
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700 transition-colors outline-none"
            >
                <div className="flex items-center">
                    {icon}
                    <span className="text-sm">{title}</span>
                </div>
                <FaAngleDown
                    className={`transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>
            <div
                className={`${
                    isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden transition-all duration-300 ease-in-out`}
            >
                <div className="">{children}</div>
            </div>
        </div>
    );
};

export default AccordionMenu;
