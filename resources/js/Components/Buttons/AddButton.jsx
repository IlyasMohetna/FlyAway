import React from "react";

function AddButton({ title = "Ajouter +", action }) {
    return (
        <button
            type="button"
            onClick={action}
            className="group relative justify-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
            {title}
        </button>
    );
}

export default AddButton;
