import { Link } from "@inertiajs/react";

const MenuItemStandlone = ({
    title,
    icon = null,
    href,
    forAccordion = false,
}) => {
    return (
        <Link
            href={href}
            className={
                forAccordion
                    ? "block p-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                    : "flex items-center p-3 rounded-lg hover:bg-gray-700 "
            }
        >
            {icon}
            <span className="text-sm">{title}</span>
        </Link>
    );
};

export default MenuItemStandlone;
