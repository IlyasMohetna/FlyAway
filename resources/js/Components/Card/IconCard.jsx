import React from "react";

function IconCard({ icon, text, height = 24, width = 32 }) {
    return (
        <div
            className={
                "bg-gray-100 w-" +
                width +
                " h-" +
                height +
                " p-4 flex flex-col items-center justify-center text-center rounded-lg shadow-md hover:bg-gray-200 transition"
            }
        >
            {icon}
            <span className="text-sm font-semibold text-gray-700">{text}</span>
        </div>
    );
}

export default IconCard;
