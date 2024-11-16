import React from "react";
import iconConfig from "../../../../iconConfig";

function TransportationModes({
    transportation_modes,
    package_transportations,
    selectedTransportationMode,
    setSelectedTransportationMode,
}) {
    const handleSelectTransportationMode = (id) => {
        setSelectedTransportationMode(id);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Choix du mode de transports
            </h3>
            <p className="text-gray-700">
                Ce forfait vous pemts de chosiir votre mode de transports
                préféré
            </p>
            <div className="grid grid-cols-4 gap-4 justify-center items-center">
                {transportation_modes.map((transportation_mode) => {
                    const Icon =
                        iconConfig[transportation_mode.name] ||
                        (() => <span></span>);
                    return (
                        <div
                            key={transportation_mode.id}
                            onClick={() =>
                                handleSelectTransportationMode(
                                    transportation_mode.id
                                )
                            }
                            className={`rounded-lg border-2 p-4 flex flex-col items-center justify-center ${
                                selectedTransportationMode ===
                                transportation_mode.id
                                    ? "border-blue-500"
                                    : "border-gray-200 "
                            } ${
                                package_transportations.some(
                                    (element) =>
                                        element.transportation_mode_id ===
                                        transportation_mode.id
                                )
                                    ? "bg-gray-50 cursor-pointer"
                                    : "bg-gray-300 cursor-not-allowed"
                            }`}
                        >
                            <div className="flex flex-col items-center justify-center space-y-2">
                                <div className="text-4xl text-black">
                                    <Icon />
                                </div>
                                <p className="text-black font-medium">
                                    {transportation_mode.name}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TransportationModes;
