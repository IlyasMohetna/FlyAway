import React from "react";
import Label from "../Labels/Label";
import Input from "../Inputs/Input";

export default function InputLabeled({
    label,
    id,
    name,
    placeholder,
    type = "text",
    required = false,
    error,
    ...props
}) {
    return (
        <div>
            <Label htmlFor={id} text={label} />
            <div className="mt-1 relative rounded-md shadow-sm">
                <Input
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    type={type}
                    required={required}
                    autoComplete="new-password"
                    error={error ? true : false}
                    {...props}
                />
            </div>

            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {error}
            </span>
        </div>
    );
}
