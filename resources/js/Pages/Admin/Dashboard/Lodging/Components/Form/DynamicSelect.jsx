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
}) {
    const [options, setOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [controller, setController] = useState(null);

    useEffect(() => {
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
                    setOptions(
                        response.data.map((item) => ({
                            value: item.id,
                            label: item.name,
                        }))
                    );
                })
                .catch((error) => {
                    if (axios.isCancel(error)) {
                        console.log("Previous request canceled", error.message);
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

    return (
        <>
            <Label text={label} />
            <Select
                options={options}
                name={name}
                value={
                    data[dataKey]
                        ? options.find(
                              (option) => option.value === data[dataKey]
                          )
                        : null
                }
                onInputChange={(inputValue) => setSearchTerm(inputValue)}
                onChange={(option) =>
                    handleInputChange(dataKey, option ? option.value : "")
                }
                placeholder={placeholder}
                styles={getCustomStyles(!!errors[dataKey])}
                menuPortalTarget={document.body}
                noOptionsMessage={() => noOptionsMessage}
            />
        </>
    );
}

export default DynamicSelect;
