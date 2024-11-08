import React from "react";

function PrimaryButton({ label }) {
    return (
        <button
            type="button"
            className="focus:outline-none text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
            {label}
        </button>
    );
}

export default PrimaryButton;
