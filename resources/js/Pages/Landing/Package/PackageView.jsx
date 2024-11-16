import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import MoneyFormat from "../../../Components/Format/MoneyFormat";
import CountryFlag from "../../../Components/Country/CountryFlag";
import ItineraryPreview from "../Components/ItineraryPreview";
import Header from "../Components/Header";
import ViewOnMap from "../Components/ViewOnMap";
import InputLabeled from "../../../Components/Form/Pack/InputLabeled";
import { Link, router } from "@inertiajs/react";
import { format, addDays } from "date-fns";

const PackageView = ({ apackage, steps }) => {
    const mainSliderRef = useRef(null);
    const [totalAmountHT, setTotalAmountHT] = useState(apackage.amount_ht);
    const [totalAmountTTC, setTotalAmountTTC] = useState(apackage.amount_ttc);
    const [nbPersons, setNbPersons] = useState(1);

    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: addDays(new Date(), 4), // Default to a 5-day range
        key: "selection",
    });
    const pickerRef = useRef(null);

    const handleDateChange = (ranges) => {
        const { startDate } = ranges.selection;
        const endDate = addDays(startDate, 4); // Automatically calculate the end date (4 additional days)
        setDateRange({ startDate, endDate, key: "selection" });
        setIsPickerOpen(false); // Close the picker after selection
    };

    // const handleDates = () => {
    //     console.log("Selected Dates:", {
    //         startDate: dateRange.startDate.toISOString(),
    //         endDate: dateRange.endDate.toISOString(),
    //     });
    //     // Add booking logic here
    // };

    // Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target)
            ) {
                setIsPickerOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setTotalAmountHT(apackage.amount_ht * nbPersons);
        setTotalAmountTTC(apackage.amount_ttc * nbPersons);
    }, [nbPersons]);

    const handleBooking = () => {
        router.get(route("client.package.booking.show"), {
            package_id: apackage.id,
            nbPersons: nbPersons,
            startDate: dateRange.startDate.toISOString(),
            endDate: dateRange.endDate.toISOString(),
        });
    };

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
                                    alt={`Gallery Image ${index + 1}`}
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

                                <span className="bg-blue-100 ml-2 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full">
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
                                    Itinéraire
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
                                    <InputLabeled
                                        label="Nombre de personnes"
                                        id="nbPersons"
                                        name="nbPersons"
                                        type="number"
                                        value={nbPersons}
                                        onChange={(e) =>
                                            setNbPersons(e.target.value)
                                        }
                                    />

                                    <div className="mb-4">
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                                            Sélectionnez vos dates
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            value={`${format(
                                                dateRange.startDate,
                                                "dd/MM/yyyy"
                                            )} - ${format(
                                                dateRange.endDate,
                                                "dd/MM/yyyy"
                                            )}`}
                                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onClick={() =>
                                                setIsPickerOpen(!isPickerOpen)
                                            }
                                        />
                                        {isPickerOpen && (
                                            <div
                                                className="absolute z-50 mt-2"
                                                ref={pickerRef}
                                            >
                                                <DateRange
                                                    ranges={[dateRange]}
                                                    onChange={handleDateChange}
                                                    rangeColors={["#4A90E2"]}
                                                    minDate={new Date()}
                                                    showSelectionPreview={true}
                                                    editableDateInputs={false} // Prevent editing end date
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleBooking}
                                        className="w-full mt-4 py-2 px-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Réserver maintenant
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PackageView;
