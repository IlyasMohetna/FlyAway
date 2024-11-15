import React, { useEffect, useRef, useState } from "react";
import SearchBar from "../Components/Header";
import ViewOnMap from "../Components/ViewOnMap";
import Slider from "react-slick";
import MoneyFormat from "../../../Components/Format/MoneyFormat";
import CountryFlag from "../../../Components/Country/CountryFlag";
import ItineraryPreview from "../Components/ItineraryPreview";
import Header from "../Components/Header";
import { Link, router } from "@inertiajs/react";

const PackageView = ({ apackage, steps }) => {
    const mainSliderRef = useRef(null);
    const [totalAmountHT, setTotalAmountHT] = useState(apackage.amount_ht);
    const [totalAmountTTC, setTotalAmountTTC] = useState(apackage.amount_ttc);
    const [nbPersons, setNbPersons] = useState(1);

    useEffect(() => {
        setTotalAmountHT(apackage.amount_ht * nbPersons);
        setTotalAmountTTC(apackage.amount_ttc * nbPersons);
    }, [nbPersons]);
    const mainSliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000,
        ref: mainSliderRef,
    };

    const handleBooking = () => {
        router.get(route("client.package.booking.show"), {
            package_id: apackage.id,
            nbPersons: nbPersons,
        });
    };

    return (
        <>
            <Header />
            <div className="max-w-full overflow-x-hidden">
                {apackage.gallery.length > 0 ? (
                    <Slider {...mainSliderSettings}>
                        {apackage.gallery.map((image, index) => (
                            <div key={index} className="w-full">
                                <img
                                    src={
                                        "/storage/" +
                                        image?.storage_driver +
                                        "/" +
                                        image?.file_name
                                    }
                                    className="w-full h-[500px] object-cover rounded-md"
                                />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <p>No images available for this room.</p>
                )}
                <div className="container mx-auto max-w-5xl px-6 lg:px-16 py-8">
                    <div className="flex">
                        <div className="w-4/6 pr-8">
                            <div className="border-b pb-4 mb-4">
                                <h1 className="text-2xl font-semibold">
                                    {apackage.title}
                                </h1>
                                <div className="flex space-x-2">
                                    <span className="text-gray-500">
                                        {apackage.city.name} -{" "}
                                        {apackage.city.region.name} -{" "}
                                        {apackage.city.region.country.name}
                                    </span>
                                    <CountryFlag
                                        iso2={apackage.city.region.country.iso2}
                                        height={20}
                                        width={20}
                                    />
                                </div>

                                <span class="bg-blue-100 ml-2 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full">
                                    <b>{apackage.type.name}</b>
                                </span>
                            </div>

                            {/* Description */}
                            <div
                                className="mt-4"
                                dangerouslySetInnerHTML={{
                                    __html: apackage.description,
                                }}
                            ></div>

                            {/* Itinerary */}
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold mb-2">
                                    Itineraire
                                </h4>
                                <ItineraryPreview days={steps} />
                            </div>
                        </div>

                        {/* Booking Sidebar */}
                        <div className="w-2/6">
                            <div>
                                <ViewOnMap
                                    longitude={apackage.city.longitude}
                                    latitude={apackage.city.latitude}
                                />
                            </div>
                            <div className="bg-white p-6 shadow-lg rounded-lg">
                                <div className="text-xl font-semibold mb-2">
                                    <span className="text-blue-600">
                                        <MoneyFormat
                                            money={apackage.amount_ttc}
                                        />
                                    </span>
                                </div>

                                <form className="space-y-4">
                                    <label className="block">
                                        <span className="text-gray-700">
                                            Nombre de personnes
                                        </span>
                                        <input
                                            type="number"
                                            className="mt-1 block w-full border rounded-md p-2"
                                            min="1"
                                            onChange={(e) =>
                                                setNbPersons(e.target.value)
                                            }
                                            value={nbPersons}
                                        />
                                    </label>
                                    <div className="flex justify-between items-center">
                                        <span>Total</span>
                                        <span>
                                            <MoneyFormat
                                                money={totalAmountTTC}
                                            />
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleBooking}
                                        className="w-full mt-4 py-2 px-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Réserver maintenant
                                    </button>
                                </form>

                                <div className="mt-8">
                                    <h4 className="text-lg font-semibold mb-2">
                                        Pourquoi réserver avec nous ?
                                    </h4>
                                    <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                                        <li class="flex items-center">
                                            <svg
                                                class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Garantie du meilleur prix sans
                                            tracas
                                        </li>
                                        <li class="flex items-center">
                                            <svg
                                                class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Service client disponible 24h/24 et
                                            7j/7
                                        </li>
                                        <li class="flex items-center">
                                            <svg
                                                class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Tours et activités sélectionnés avec
                                            soin
                                        </li>
                                        <li class="flex items-center">
                                            <svg
                                                class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Assurance voyage gratuite
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PackageView;
