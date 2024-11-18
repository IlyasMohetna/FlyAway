import React, { useState, Fragment, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import UserDashboardLayout from "../Layouts/UserDashboardLayout";
import { Dialog, Transition } from "@headlessui/react";
import ItineraryPreview from "../../../Landing/Components/ItineraryPreview";

function IitineraryModal({ open, setOpen, days, lodging }) {
    console.log(days);
    return (
        <>
            <Transition appear show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 bg-opacity-30"
                    onClose={() => setOpen(false)}
                >
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Mon itineraire :
                                </Dialog.Title>
                                <div className="mt-4">
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-6">
                                            <ItineraryPreview days={days} />
                                        </div>

                                        <div className="col-span-6">
                                            <div
                                                className="h-[170px] bg-gray-100 p-4 rounded-md shadow-md mb-4"
                                                style={{ overflow: "auto" }}
                                            >
                                                <h3 className="text-lg font-bold">
                                                    Information de contact :
                                                </h3>
                                                <div>
                                                    <p>Nom : {lodging.name}</p>
                                                    <p>
                                                        Address :{" "}
                                                        {lodging.address_1}
                                                    </p>
                                                    <p>
                                                        Email : {lodging.email}
                                                    </p>
                                                    <p>
                                                        Telephone :{" "}
                                                        {lodging.phone}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

IitineraryModal.layout = (page) => <AdminDashboardLayout children={page} />;

export default IitineraryModal;
