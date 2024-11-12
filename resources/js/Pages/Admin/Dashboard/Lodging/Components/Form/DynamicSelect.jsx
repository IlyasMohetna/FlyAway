import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Label from "../../../../../../Components/Form/Labels/Label";

function DynamicSelect({
    label,
    selectedValue, // New prop for current selected value
    fetchRoute,
    name,
    handleInputChange,
    errors,
    placeholder = "Select an option",
    noOptionsMessage = "No options available",
    defaultOption = null, // Default option if any
}) {
    // Initialize options with defaultOption if provided
    const [options, setOptions] = useState(
        defaultOption ? [defaultOption] : []
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [controller, setController] = useState(null);

    useEffect(() => {
        // Function to fetch options
        const fetchOptions = () => {
            if (controller) {
                controller.abort();
            }

            const newController = new AbortController();
            setController(newController);

            if (fetchRoute) {
                axios
                    .get(fetchRoute, {
                        params: {
                            search: searchTerm,
                        },
                        signal: newController.signal,
                    })
                    .then((response) => {
                        const fetchedOptions = response.data.map((item) => ({
                            value: item.id,
                            label: item.name,
                        }));

                        if (
                            defaultOption &&
                            !fetchedOptions.find(
                                (option) => option.value === defaultOption.value
                            )
                        ) {
                            fetchedOptions.unshift(defaultOption);
                        }

                        setOptions(fetchedOptions);
                        console.log(fetchedOptions);
                    })
                    .catch((error) => {
                        if (axios.isCancel(error)) {
                            console.log(
                                "Previous request canceled",
                                error.message
                            );
                        } else {
                            console.error("Error fetching options:", error);
                        }
                    });
            }

            return () => {
                if (newController) {
                    newController.abort();
                }
            };
        };

        // Fetch options initially on mount and when searchTerm changes
        fetchOptions();
    }, [fetchRoute, searchTerm]);

    const customStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: "white",
            borderColor: errors[name] ? "#f87171" : "#d1d5db",
            borderWidth: "1px",
            boxShadow: state.isFocused
                ? errors[name]
                    ? "0 0 0 1px #f87171"
                    : "0 0 0 1px #a5b4fc"
                : "none",
            "&:hover": {
                borderColor: errors[name] ? "#f87171" : "#a5b4fc",
            },
        }),
        menu: (base) => ({
            ...base,
            zIndex: 1050, // Increased z-index to ensure the dropdown is above other components
        }),
        menuPortal: (base) => ({
            ...base,
            zIndex: 1050, // To ensure the dropdown menu is above the modal or other UI elements
        }),
    };

    return (
        <>
            <Label text={label} />
            <Select
                options={options}
                name={name}
                value={
                    options.find((option) => option.value === selectedValue) ||
                    defaultOption
                }
                onInputChange={(inputValue) => setSearchTerm(inputValue)}
                onMenuOpen={() => {
                    if (!searchTerm && fetchRoute) {
                        setSearchTerm(""); // Trigger the effect to load initial data
                    }
                }}
                onChange={(option) =>
                    handleInputChange(name, option ? option.value : "")
                }
                placeholder={placeholder}
                styles={customStyles}
                menuPortalTarget={document.body}
                noOptionsMessage={() => noOptionsMessage}
                isClearable={true} // Allow clear option
            />
        </>
    );
}

export default DynamicSelect;
