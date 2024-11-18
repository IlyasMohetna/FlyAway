import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Label from "../Form/Labels/Label";

function CascadingSelect({
    countries,
    data,
    handleInputChange,
    setData,
    errors,
}) {
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(
        data.country_id || null
    );
    const [selectedRegion, setSelectedRegion] = useState(
        data.region_id || null
    );

    useEffect(() => {
        if (selectedCountry) {
            axios
                .get(`/config/regions/${selectedCountry.value}`)
                .then((response) => {
                    setRegions(
                        response.data.regions.map((region) => ({
                            value: region.id,
                            label: region.name,
                        }))
                    );
                    setSelectedRegion(null); // Reset region and city selections
                    setCities([]);
                    handleInputChange("region_id", "");
                    handleInputChange("city_id", "");
                });
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedRegion) {
            axios
                .get(`/config/cities/${selectedRegion.value}`)
                .then((response) => {
                    setCities(
                        response.data.cities.map((city) => ({
                            value: city.id,
                            label: city.name,
                        }))
                    );
                    handleInputChange("city_id", "");
                });
        }
    }, [selectedRegion]);

    // Define custom styles for Select components, applying error styles when needed
    const getCustomStyles = (hasError) => ({
        control: (base) => ({
            ...base,
            backgroundColor: "white",
            borderColor: hasError ? "#f87171" : "#d1d5db", // red for error, gray for default
            borderWidth: "1px", // Explicit border thickness to match Tailwind's 'border-2'
            boxShadow: hasError ? "0 0 0 1px #f87171" : "none", // red outline for focus on error
            "&:hover": {
                borderColor: hasError ? "#f87171" : "#a5b4fc", // red on hover if error
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
    });

    return (
        <div className="space-y-6">
            {/* Country Select */}
            <div className="mt-6">
                <Label text={"Pays"} />
                <Select
                    options={countries.map((country) => ({
                        value: country.id,
                        label: country.name,
                    }))}
                    value={selectedCountry}
                    onChange={(option) => {
                        setSelectedCountry(option);
                        handleInputChange(
                            "country_id",
                            option ? option.value : ""
                        );
                    }}
                    placeholder="Select a country"
                    styles={getCustomStyles(!!errors.country)} // Pass error state for conditional styling
                    menuPortalTarget={document.body}
                    isClearable={true}
                />
                {errors.country && (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {errors.country}
                    </span>
                )}
            </div>

            {/* Region Select */}
            <div>
                <Label text={"Region"} />
                <Select
                    options={regions}
                    value={selectedRegion}
                    onChange={(option) => {
                        setSelectedRegion(option);
                        handleInputChange(
                            "region_id",
                            option ? option.value : ""
                        );
                    }}
                    placeholder="Select a region"
                    styles={getCustomStyles(!!errors.region)} // Pass error state for conditional styling
                    menuPortalTarget={document.body}
                    noOptionsMessage={() => "Veuillez choisir un pays !"}
                    isClearable={true}
                />
                {errors.region && (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {errors.region}
                    </span>
                )}
            </div>

            {/* City Select */}
            <div>
                <Label text={"Ville"} />
                <Select
                    options={cities}
                    value={
                        data.city_id
                            ? cities.find((city) => city.value === data.city_id)
                            : null
                    }
                    onChange={(option) =>
                        handleInputChange("city_id", option ? option.value : "")
                    }
                    placeholder="Select a city"
                    styles={getCustomStyles(!!errors.city)} // Pass error state for conditional styling
                    menuPortalTarget={document.body}
                    noOptionsMessage={() => "Veuillez choisir une region !"}
                />
                {errors.city && (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {errors.city}
                    </span>
                )}
            </div>
        </div>
    );
}

export default CascadingSelect;
