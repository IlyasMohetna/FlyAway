import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Label from "../../../../../../Components/Form/Labels/Label";

function DynamicSelect({
    label,
    selectedValue,
    fetchRoute,
    name,
    handleInputChange,
    errors,
    placeholder = "Select an option",
    noOptionsMessage = "No options available",
    defaultOption = null,
    multiple = false, // Allow multiple selection
}) {
    const [options, setOptions] = useState(
        defaultOption ? [defaultOption] : []
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [controller, setController] = useState(null);

    useEffect(() => {
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

                        let updatedOptions = [...fetchedOptions];

                        // Add currently selected options to ensure they are available in the list
                        if (multiple && Array.isArray(selectedValue)) {
                            const selectedOptions = selectedValue
                                .map((val) => {
                                    return (
                                        options.find(
                                            (opt) => opt.value === val
                                        ) || {
                                            value: val,
                                            label: `Loading...`, // Placeholder if not found in fetched options
                                        }
                                    );
                                })
                                .filter(
                                    (selectedOption, index, self) =>
                                        self.findIndex(
                                            (opt) =>
                                                opt.value ===
                                                selectedOption.value
                                        ) === index
                                ); // Remove duplicates based on value
                            updatedOptions = [
                                ...selectedOptions,
                                ...fetchedOptions.filter(
                                    (fetchedOption) =>
                                        !selectedOptions.find(
                                            (selectedOption) =>
                                                selectedOption.value ===
                                                fetchedOption.value
                                        )
                                ),
                            ];
                        } else if (!multiple && selectedValue) {
                            const selectedOption = options.find(
                                (opt) => opt.value === selectedValue
                            );
                            if (
                                selectedOption &&
                                !fetchedOptions.find(
                                    (opt) => opt.value === selectedOption.value
                                )
                            ) {
                                updatedOptions.unshift(selectedOption);
                            }
                        }

                        // Include defaultOption if not already present
                        if (
                            defaultOption &&
                            !updatedOptions.find(
                                (option) => option.value === defaultOption.value
                            )
                        ) {
                            updatedOptions.unshift(defaultOption);
                        }

                        setOptions(updatedOptions);
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

        fetchOptions();
    }, [fetchRoute, searchTerm, selectedValue]);

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
            zIndex: 1050,
        }),
        menuPortal: (base) => ({
            ...base,
            zIndex: 1050,
        }),
    };

    const getValue = () => {
        if (multiple) {
            // If multiple, selectedValue should be an array
            if (Array.isArray(selectedValue)) {
                return options.filter((option) =>
                    selectedValue.includes(option.value)
                );
            }
            return [];
        } else {
            // If single, selectedValue should be a single value
            return (
                options.find((option) => option.value === selectedValue) || null
            );
        }
    };

    return (
        <>
            <Label text={label} />
            <Select
                options={options}
                name={name}
                isMulti={multiple}
                value={getValue()}
                onInputChange={(inputValue) => setSearchTerm(inputValue)}
                onMenuOpen={() => {
                    if (!searchTerm && fetchRoute) {
                        setSearchTerm(""); // Trigger the effect to load initial data
                    }
                }}
                onChange={(option) => {
                    if (multiple) {
                        // If multiple selection, option will be an array
                        handleInputChange(
                            name,
                            option ? option.map((opt) => opt.value) : []
                        );
                    } else {
                        handleInputChange(name, option ? option.value : null);
                    }
                }}
                placeholder={placeholder}
                styles={customStyles}
                menuPortalTarget={document.body}
                noOptionsMessage={() => noOptionsMessage}
                isClearable={true}
            />
        </>
    );
}

export default DynamicSelect;
