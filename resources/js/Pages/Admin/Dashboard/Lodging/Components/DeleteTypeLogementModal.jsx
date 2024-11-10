import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function DeleteTypeLogementModal({
    open,
    setOpen,
    id = null,
    name = null,
}) {
    const { delete: destroy, processing } = useForm();
    const handleDelete = (id) => {
        destroy(route("lodging.type.delete", { id }), {
            onSuccess: () => setOpen(false),
        });
    };

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 bg-opacity-30"
                onClose={() => setOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Supprimer l'élément
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-600">
                                        Voulez-vous vraiment supprimer "{name}"
                                        ? Cette action ne peut pas être annulée.
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="text-gray-700 bg-gray-200 hover:bg-gray-300 outline-none rounded-md px-4 py-2"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(id)}
                                        className="text-white bg-red-500 hover:bg-red-600 outline-none rounded-md px-4 py-2"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "En cours..."
                                            : "Supprimer"}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
