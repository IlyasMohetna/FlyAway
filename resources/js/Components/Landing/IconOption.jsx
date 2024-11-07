import React from "react";

function IconOption({ title = null, icon }) {
    return (
        <div
            title={title}
            className="flex flex-col items-center justify-center w-full border-2 border-gray-600 rounded-lg px-4 py-4 transform transition duration-500 hover:scale-110"
        >
            {icon}
        </div>
    );
}

export default IconOption;
