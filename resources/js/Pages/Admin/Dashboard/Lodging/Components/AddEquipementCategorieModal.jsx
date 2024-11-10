import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import InputLabeled from "../../../../../Components/Form/Pack/InputLabeled";
import { useForm } from "@inertiajs/react";
import * as Yup from "yup";

export default function AddEquipementCategorieModal({ open, setOpen }) {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Le nom est requis"),
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });

    const [clientErrors, setClientErrors] = useState({});

    useEffect(() => {
        if (!open) {
            reset();
            setClientErrors({});
        }
    }, [open]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(data, { abortEarly: false });
            setClientErrors({});

            post(route("lodging.equipement_categorie.store"), {
                onSuccess: () => setOpen(false),
            });
        } catch (validationErrors) {
            const formattedErrors = {};
            validationErrors.inner.forEach((error) => {
                formattedErrors[error.path] = error.message;
            });
            setClientErrors(formattedErrors);
        }
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
                                    Ajouter une catégorie d'équipement
                                </Dialog.Title>
                                <form onSubmit={handleSubmit} className="mt-4">
                                    <div className="w-full mb-3">
                                        <InputLabeled
                                            label="Nom"
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            error={
                                                clientErrors.name || errors.name
                                            }
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="float-right inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "En cours..."
                                                : "Ajouter"}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
