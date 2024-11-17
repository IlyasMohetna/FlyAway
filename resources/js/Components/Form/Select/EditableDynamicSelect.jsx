import React, { useState, useEffect } from "react";
import DynamicSelect from "../../../Pages/Admin/Dashboard/Lodging/Components/Form/DynamicSelect";

function EditableDynamicSelect({
    label,
    defaultOption,
    selectedValue,
    fetchRoute,
    name,
    handleInputChange,
    errors,
    placeholder = "Select an option",
    noOptionsMessage = "No options available",
    multiple = false,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(defaultOption);

    useEffect(() => {
        // Update the current value displayed if selectedValue or defaultOption changes
        if (selectedValue) {
            setCurrentValue({
                value: selectedValue,
                label: defaultOption.label, // Label will be updated by DynamicSelect as well
            });
        }
    }, [selectedValue, defaultOption]);

    const toggleEdit = () => {
        setIsEditing(true);
    };

    const handleSelectChange = (key, value) => {
        handleInputChange(key, value);
        setCurrentValue(value ? { value, label: value.label } : null);
        // Do not set `isEditing` back to false so that the select remains open until user decides to close.
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            {isEditing ? (
                <DynamicSelect
                    label={null}
                    selectedValue={selectedValue}
                    fetchRoute={fetchRoute}
                    name={name}
                    handleInputChange={handleSelectChange}
                    errors={errors}
                    placeholder={placeholder}
                    noOptionsMessage={noOptionsMessage}
                    defaultOption={currentValue}
                    multiple={multiple}
                />
            ) : (
                <div className="flex items-center">
                    <span className="text-sm text-gray-900">
                        {currentValue ? currentValue.label : "Select an option"}
                    </span>
                    <button
                        type="button"
                        onClick={toggleEdit}
                        className="ml-4 text-blue-500 hover:underline"
                    >
                        Modifier
                    </button>
                </div>
            )}
        </div>
    );
}

export default EditableDynamicSelect;
