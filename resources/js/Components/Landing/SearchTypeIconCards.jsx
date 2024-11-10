import React from "react";
import { FaTrain, FaPlane, FaHotel, FaCar, FaBusAlt } from "react-icons/fa";
import IconOption from "./IconOption";
import { MdOutlineTravelExplore } from "react-icons/md";

const SearchTypeIconCards = () => {
    return (
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 ">
            <IconOption
                title={"Forfait"}
                icon={
                    <MdOutlineTravelExplore className="text-3xl mb-2 text-blue-500" />
                }
            />

            <IconOption
                title={"Logement"}
                icon={<FaHotel className="text-3xl mb-2 text-green-500" />}
            />

            <IconOption
                title={"Voiture"}
                icon={<FaCar className="text-3xl mb-2 text-yellow-500" />}
            />

            <IconOption
                title={"Avion"}
                icon={<FaPlane className="text-3xl mb-2 text-indigo-500" />}
            />

            <IconOption
                title={"Bus"}
                icon={<FaBusAlt className="text-3xl mb-2 text-purple-500" />}
            />

            <IconOption
                title={"Train"}
                icon={<FaTrain className="text-3xl mb-2 text-red-500" />}
            />
        </div>
    );
};

export default SearchTypeIconCards;
