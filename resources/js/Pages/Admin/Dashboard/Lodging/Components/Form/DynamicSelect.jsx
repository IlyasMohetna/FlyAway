import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Label from "../../../../../../Components/Form/Labels/Label";

function DynamicSelect({
    label,
    dataKey,
    fetchRoute,
    data,
    name,
    handleInputChange,
    errors,
    placeholder = "Select an option",
    noOptionsMessage = "No options available",
    defaultOption = null, // Added this line
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

                        // Include defaultOption if not already in fetchedOptions
                        if (
                            defaultOption &&
                            !fetchedOptions.find(
                                (option) => option.value === defaultOption.value
                            )
                        ) {
                            fetchedOptions.unshift(defaultOption);
                        }

                        setOptions(fetchedOptions);
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

    const getCustomStyles = (hasError) => ({
        control: (base) => ({
            ...base,
            backgroundColor: "white",
            borderColor: hasError ? "#f87171" : "#d1d5db",
            borderWidth: "1px",
            boxShadow: hasError ? "0 0 0 1px #f87171" : "none",
            "&:hover": {
                borderColor: hasError ? "#f87171" : "#a5b4fc",
            },
        }),
        menu: (base) => ({
            ...base,
            zIndex: 9999,
        }),
    });

    // Determine the selected value
    const selectedValue =
        options.find((option) => option.value === data[dataKey]) ||
        defaultOption;

    return (
        <>
            <Label text={label} />
            <Select
                options={options}
                name={name}
                value={selectedValue}
                onInputChange={(inputValue) => setSearchTerm(inputValue)}
                onMenuOpen={() => {
                    if (!searchTerm && fetchRoute) {
                        // If there's no search term and dropdown is opened, fetch options
                        setSearchTerm(""); // Trigger the effect to load initial data
                    }
                }}
                onChange={(option) =>
                    handleInputChange(dataKey, option ? option.value : "")
                }
                placeholder={placeholder}
                styles={getCustomStyles(!!errors[dataKey])}
                menuPortalTarget={document.body}
                noOptionsMessage={() => noOptionsMessage}
                isClearable={true} // Allow clear option
            />
        </>
    );
}

export default DynamicSelect;
