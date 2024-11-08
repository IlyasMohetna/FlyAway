import React from "react";

function SecondaryButton({ label }) {
    return (
        <button
            type="button"
            className="focus:outline-none text-black bg-white hover:bg-white- font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
            {label}
        </button>
    );
}

export default SecondaryButton;
