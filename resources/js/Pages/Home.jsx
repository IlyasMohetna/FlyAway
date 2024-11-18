import { useState, useEffect } from "react";
import "../../css/landing.css";
import NavigationBar from "../Components/Landing/NavigationBar";
import Footer from "../Components/Landing/Footer";
import MultiRangeSlider from "./Landing/Components/MultiRangeSlider";
import DynamicSelect from "./Admin/Dashboard/Lodging/Components/Form/DynamicSelect";
import SearchTypeIconCards from "../Components/Landing/SearchTypeIconCards";
import { Link } from "@inertiajs/react";

const Home = ({
    min_amount,
    max_amount,
    min_duration,
    max_duration,
    package_types,
}) => {
    const [destinationId, setDestinationId] = useState("");
    const [packageTypes, setPackageTypes] = useState([]);
    const [amountRange, setAmountRange] = useState([min_amount, max_amount]);
    const [durationRange, setDurationRange] = useState([
        min_duration,
        max_duration,
    ]);

    const handlePackageTypeChange = (typeId) => {
        const updatedTypes = packageTypes.includes(typeId)
            ? packageTypes.filter((id) => id !== typeId)
            : [...packageTypes, typeId];
        setPackageTypes(updatedTypes);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        router.get(route("landing.package.search.index"), {
            destination_id: destinationId,
            "package_types[]": packageTypes,
            "amount_range[0]": amountRange[0],
            "amount_range[1]": amountRange[1],
            "duration_range[0]": durationRange[0],
            "duration_range[1]": durationRange[1],
        });
    };

    return (
        <>
            <NavigationBar />

            <section
                className="relative py-36 bg-[url('/assets/img/landing_hero.jpg')] bg-cover jarallax"
                data-jarallax=""
                data-speed="0.5"
            >
                <div className="absolute inset-0 bg-slate-900/40" />
                <div className="container relative">
                    <div className="grid lg:grid-cols-12 md:grid-cols-2 mt-10 items-center gap-6">
                        <div className="lg:col-span-5">
                            <h5 className="text-3xl font-dancing text-white">
                                Trouvez votre séjour idéal
                            </h5>
                            <h4 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-6xl mb-6 mt-5">
                                Où veux-tu aller ?
                            </h4>
                            <p className="text-white/70 text-xl max-w-xl">
                                Vous planifiez un voyage? Nous organiserons
                                votre voyage avec les meilleurs endroits et dans
                                le meilleur budget !
                            </p>
                            <div className="mt-6">
                                <Link
                                    href={route("landing.package.search.index")}
                                    className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md"
                                >
                                    Voir tout les forfaits
                                </Link>
                            </div>
                        </div>
                        <div className="lg:col-span-6">
                            <div className="bg-white dark:bg-slate-900 rounded-xl shadow dark:shadow-gray-800 p-6 z-10 relative lg:ms-10">
                                <h4 className="mb-5 text-2xl font-semibold">
                                    Rechercher une destination
                                </h4>
                                <form>
                                    <div className="grid grid-cols-1 gap-3">
                                        <SearchTypeIconCards />
                                        <form onSubmit={handleSearch}>
                                            <div className="grid grid-cols-1 gap-6">
                                                {/* City Selection */}
                                                <div>
                                                    <DynamicSelect
                                                        label="Destination"
                                                        name="destination_id"
                                                        selectedValue={
                                                            destinationId
                                                        }
                                                        handleInputChange={(
                                                            name,
                                                            value
                                                        ) =>
                                                            setDestinationId(
                                                                value
                                                            )
                                                        }
                                                        fetchRoute={route(
                                                            "select.city"
                                                        )}
                                                        errors={{}}
                                                        noOptionsMessage="Veuillez sélectionner une destination !"
                                                        placeholder="Sélectionner une option"
                                                    />
                                                </div>

                                                {/* Package Types */}
                                                <div>
                                                    <h3 className="font-medium text-gray-700 mb-2">
                                                        Types de forfaits
                                                    </h3>
                                                    <ul>
                                                        {package_types.map(
                                                            (type) => (
                                                                <li
                                                                    key={
                                                                        type.id
                                                                    }
                                                                >
                                                                    <label className="flex items-center space-x-2">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={packageTypes.includes(
                                                                                type.id
                                                                            )}
                                                                            onChange={() =>
                                                                                handlePackageTypeChange(
                                                                                    type.id
                                                                                )
                                                                            }
                                                                            className="text-blue-500 rounded"
                                                                        />
                                                                        <span>
                                                                            {
                                                                                type.name
                                                                            }
                                                                        </span>
                                                                    </label>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>

                                                {/* Price Range */}
                                                <div>
                                                    <MultiRangeSlider
                                                        min={min_amount}
                                                        max={max_amount}
                                                        label="Prix"
                                                        unit="€"
                                                        value={amountRange}
                                                        onChange={
                                                            setAmountRange
                                                        }
                                                    />
                                                </div>

                                                {/* Duration Range */}
                                                <div>
                                                    <MultiRangeSlider
                                                        min={min_duration}
                                                        max={max_duration}
                                                        label="Durée (Jours)"
                                                        unit=""
                                                        value={durationRange}
                                                        onChange={
                                                            setDurationRange
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="py-1 px-5 h-10 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md w-full cursor-pointer"
                                                    >
                                                        Rechercher
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Home;
