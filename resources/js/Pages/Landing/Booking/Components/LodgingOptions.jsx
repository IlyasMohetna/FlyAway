import React from "react";

function LodgingOptions({
    lodgingOptions,
    selectedLodgingOption,
    setSelectedLodgingOption,
}) {
    const handleSelectLodgingOption = (id) => {
        setSelectedLodgingOption(id);
    };

    console.log(lodgingOptions);

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Choix de l'hébergement
            </h3>
            <p className="text-gray-700">
                Ce forfait vous permet de choisir votre hébergement préféré.
            </p>
            <div className="grid grid-cols-4 gap-4">
                {lodgingOptions.map(({ id, lodging }) => {
                    return (
                        <div
                            key={id}
                            onClick={() =>
                                handleSelectLodgingOption(lodging.id)
                            }
                            className={`rounded-lg border-2 p-4 flex flex-col items-center justify-between cursor-pointer ${
                                selectedLodgingOption === lodging.id
                                    ? "border-blue-500"
                                    : "border-gray-200"
                            } bg-gray-50`}
                        >
                            <div className="w-full flex justify-center items-center">
                                <img
                                    src={
                                        lodging.image ||
                                        "https://via.placeholder.com/150"
                                    }
                                    alt={lodging.name}
                                    className="h-24 w-24 object-cover rounded-full"
                                />
                            </div>
                            <div className="mt-4">
                                <p className="text-center text-black font-medium">
                                    {lodging.name}
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <svg
                                            key={value}
                                            className={`w-4 h-4 mt-2 ${
                                                lodging.star_rating >= value
                                                    ? "text-yellow-300"
                                                    : "text-gray-300"
                                            }`}
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 22 20"
                                            style={{ cursor: "pointer" }}
                                        >
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default LodgingOptions;
