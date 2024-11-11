import { useState, useEffect, useRef } from "react";
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoMdResize } from "react-icons/io";
import { FaBed } from "react-icons/fa";
import { FaChild } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import IconCard from "../../../../Components/Card/IconCard";
import DOMPurify from "dompurify";
import AddButton from "../../../../Components/Buttons/AddButton";
import AddRoomModal from "./Components/AddRoomModal";
import DeleteConfirmModal from "./Components/DeleteConfirmModal";

const RoomList = ({ lodging }) => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [roomGallery, setRoomGallery] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const mainSliderRef = useRef(null);
    const thumbSliderRef = useRef(null);

    const handleRoomClick = async (room) => {
        setSelectedRoom(room);
        setLoading(true);

        try {
            const response = await axios.get(
                route("lodging.rooms.data", { room_id: room.id })
            );
            const roomData = response.data;

            setSelectedRoom(roomData);
            console.log(selectedRoom);
            setRoomGallery(roomData.gallery);
        } catch (error) {
            console.error("Failed to fetch room or gallery data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Settings for the main slider
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
        asNavFor: thumbSliderRef.current, // Synchronized with thumbnails
        ref: mainSliderRef,
    };

    // Settings for the thumbnail slider
    const thumbSliderSettings = {
        slidesToShow: roomGallery.length > 5 ? 5 : roomGallery.length,
        slidesToScroll: 1,
        asNavFor: mainSliderRef.current, // Synchronized with the main slider
        focusOnSelect: true,
        centerMode: true,
        centerPadding: "10px",
        arrows: false,
        ref: thumbSliderRef,
    };

    const handleAddRoomClick = () => {
        setIsAddRoomModalOpen(true);
    };

    const openDeleteModal = (item) => {
        setSelectedRoom(item);
        setIsDeleteModalOpen(true);
    };

    return (
        <>
            <div
                data-testid="flowbite-card"
                className="flex relative w-full break-words flex-col card p-6 dark:shadow-dark-md mb-6 py-4 bg-lightinfo dark:bg-darkinfo overflow-hidden rounded-md border-none shadow-none dark:shadow-none"
                style={{ borderRadius: 7 }}
            >
                <div className="flex h-full flex-col justify-start gap-0 p-0">
                    <div className="items-center grid grid-cols-12 gap-6">
                        <div className="col-span-9">
                            <h4 className="text-xl text-dark dark:text-white mb-3">
                                La gestion des chambres de :{" "}
                                <b>{lodging.name}</b>
                            </h4>
                        </div>
                        <div className="col-span-3 flex justify-center -mb-10">
                            <img
                                alt=""
                                loading="lazy"
                                width={168}
                                height={165}
                                decoding="async"
                                data-nimg={1}
                                className="md:-mb-[31px] -mb-4 "
                                src="/assets/img/ChatBc.png"
                                style={{ color: "transparent" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex container mx-auto p-6">
                <div className="w-2/6 p-4 border-r">
                    <div className="flex">
                        <div className="w-4/6">
                            <h4 className="font-semibold text-xl mb-4 mt-2">
                                Liste des chambres
                            </h4>
                        </div>
                        <div className="w-2/6">
                            <AddButton
                                action={() => setIsAddRoomModalOpen(true)}
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        {lodging.rooms.map((room) => (
                            <div
                                className="grid grid-cols-6 gap-4 p-2"
                                key={room.id}
                            >
                                <div className="col-span-5">
                                    <button
                                        className={`cursor-pointer text-left w-full p-2 rounded-2xl ${
                                            selectedRoom?.id === room.id
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-100"
                                        }`}
                                        onClick={() => handleRoomClick(room)}
                                    >
                                        Reference : {room.reference} Numéro :{" "}
                                        {room.number}
                                    </button>
                                </div>
                                <div className="col-span-1 float-right w-full">
                                    <button
                                        type="button"
                                        onClick={() => openDeleteModal(room)}
                                        className="text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg px-5 py-2.5 mt-1"
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-4/6 p-4 relative">
                    {loading ? (
                        <BeatLoader />
                    ) : selectedRoom ? (
                        <>
                            <h2 className="text-2xl font-semibold flex">
                                Détail De La Chambre N°{selectedRoom.number} :
                                REF#{selectedRoom.reference}
                                <span
                                    className="flex h-fit ml-4 w-fit items-center font-bold bg-orange-400 text-white p-1 text-sm px-2.5 py-[5px] rounded-md"
                                    data-testid="flowbite-badge"
                                >
                                    <span>Prix : {selectedRoom.price}€</span>
                                </span>
                            </h2>

                            {roomGallery.length > 0 ? (
                                <>
                                    <Slider
                                        {...mainSliderSettings}
                                        className="mt-4"
                                    >
                                        {roomGallery.map((image, index) => (
                                            <div key={index} className="w-full">
                                                <img
                                                    src={image.full_url}
                                                    alt={`Room ${
                                                        selectedRoom.reference
                                                    } Image ${index + 1}`}
                                                    className="w-full h-[300px] object-cover rounded-md"
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                </>
                            ) : (
                                <p>No images available for this room.</p>
                            )}
                            <div>
                                <div className="w-full mx-auto mt-4">
                                    <div className="flex justify-center flex-wrap gap-4">
                                        <IconCard
                                            text={
                                                Number(
                                                    selectedRoom.surface
                                                ).toFixed() + "m²"
                                            }
                                            icon={
                                                <IoMdResize className="text-blue-500 text-3xl mb-2" />
                                            }
                                        />

                                        <IconCard
                                            text={
                                                selectedRoom.bed_number +
                                                " Lits"
                                            }
                                            icon={
                                                <FaBed className="text-blue-500 text-3xl mb-2" />
                                            }
                                        />

                                        <IconCard
                                            text={
                                                "x" +
                                                selectedRoom.max_adult +
                                                " Adultes"
                                            }
                                            icon={
                                                <IoPeopleSharp className="text-blue-500 text-3xl mb-2" />
                                            }
                                        />

                                        <IconCard
                                            text={
                                                "x" +
                                                selectedRoom.max_child +
                                                " Enfants"
                                            }
                                            icon={
                                                <FaChild className="text-blue-500 text-3xl mb-2" />
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="mt-12">
                                    <h3 className="text-1xl font-semibold">
                                        Description :
                                    </h3>
                                    <div
                                        className="quill-html-content"
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                                selectedRoom.description
                                            ),
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Veuillez sélectionner une chambre.</p>
                    )}
                </div>
            </div>

            <AddRoomModal
                open={isAddRoomModalOpen}
                setOpen={setIsAddRoomModalOpen}
                lodgingId={lodging?.id}
                // onAddSuccess={() => fetchAttributes(selectedCategory?.id, 1)}
            />

            {selectedRoom && (
                <DeleteConfirmModal
                    open={isDeleteModalOpen}
                    setOpen={setIsDeleteModalOpen}
                    id={selectedRoom.id}
                    name={selectedRoom.reference}
                    route={route("lodging.rooms.delete", selectedRoom.id)}
                    // onSuccess={() => fetchAttributes(selectedCategory?.id, 1)}
                />
            )}
        </>
    );
};

RoomList.layout = (page) => <AdminDashboardLayout children={page} />;

export default RoomList;
