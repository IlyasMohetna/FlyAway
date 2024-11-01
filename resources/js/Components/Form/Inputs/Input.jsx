import React from "react";

export default function Input({
    id,
    name,
    placeholder,
    type = "text",
    required = false,
    error = false,
    ...props
}) {
    return (
        <input
            id={id}
            name={name}
            placeholder={placeholder}
            type={type}
            required={required}
            className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out sm:text-sm sm:leading-5
                ${
                    error
                        ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-blue-300"
                }`}
            {...props}
        />
    );
}
