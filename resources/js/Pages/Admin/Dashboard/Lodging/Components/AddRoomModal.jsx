import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import InputLabeled from "../../../../../Components/Form/Pack/InputLabeled";
import { useForm } from "@inertiajs/react";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";

export default function AddRoomModal({ lodgingId, open, setOpen }) {
    const validationSchema = Yup.object().shape({
        reference: Yup.string().required("La référence est requise"),
        number: Yup.string().required("Le numéro est requis"),
        max_adult: Yup.number()
            .nullable()
            .transform((value, originalValue) =>
                String(originalValue).trim() === "" ? null : value
            )
            .required("Le nombre maximum d'adultes est requis")
            .min(1, "Il doit y avoir au moins un adulte"),
        max_child: Yup.number()
            .nullable()
            .transform((value, originalValue) =>
                String(originalValue).trim() === "" ? null : value
            )
            .required("Le nombre maximum d'enfants est requis")
            .min(0, "Le nombre minimum d'enfants est zéro"),
        description: Yup.string().required("La description est requise"),
        surface: Yup.number()
            .nullable()
            .transform((value, originalValue) =>
                String(originalValue).trim() === "" ? null : value
            )
            .required("La surface est requise")
            .min(1, "La surface doit être au moins 1"),
        price: Yup.number()
            .nullable()
            .transform((value, originalValue) =>
                String(originalValue).trim() === "" ? null : value
            )
            .required("Le prix est requis")
            .min(0, "Le prix ne peut pas être négatif"),
        bed_number: Yup.number()
            .nullable()
            .transform((value, originalValue) =>
                String(originalValue).trim() === "" ? null : value
            )
            .required("Le nombre de lits est requis")
            .min(1, "Il doit y avoir au moins un lit"),
        images: Yup.array()
            .min(1, "Vous devez télécharger au moins une image.")
            .required("Les images sont requises."),
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        reference: "",
        number: "",
        max_adult: "",
        max_child: "",
        description: "",
        surface: "",
        price: "",
        bed_number: "",
        images: [],
    });

    const [clientErrors, setClientErrors] = useState({});

    const onDrop = (acceptedFiles) => {
        setData("images", [...data.images, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
    });

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

            const formData = new FormData();
            formData.append("reference", data.reference);
            formData.append("number", data.number);
            formData.append("max_adult", data.max_adult);
            formData.append("max_child", data.max_child);
            formData.append("description", data.description);
            formData.append("surface", data.surface);
            formData.append("price", data.price);
            formData.append("bed_number", data.bed_number);
            data.images.forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });

            post(route("lodging.room.store", { lodging_id: lodgingId }), {
                data: formData,
                onSuccess: () => setOpen(false),
                forceFormData: true,
            });
        } catch (validationErrors) {
            console.log(validationErrors);
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
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Ajouter une chambre
                                </Dialog.Title>
                                <form onSubmit={handleSubmit} className="mt-4">
                                    {/* Grouped fields in rows */}
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <InputLabeled
                                            label="Référence"
                                            id="reference"
                                            name="reference"
                                            type="text"
                                            value={data.reference}
                                            onChange={(e) =>
                                                setData(
                                                    "reference",
                                                    e.target.value
                                                )
                                            }
                                            error={
                                                clientErrors.reference ||
                                                errors.reference
                                            }
                                        />
                                        <InputLabeled
                                            label="Numéro de la chambre"
                                            id="number"
                                            name="number"
                                            type="text"
                                            value={data.number}
                                            onChange={(e) =>
                                                setData(
                                                    "number",
                                                    e.target.value
                                                )
                                            }
                                            error={
                                                clientErrors.number ||
                                                errors.number
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <InputLabeled
                                            label="Nombre maximum d'adultes"
                                            id="max_adult"
                                            name="max_adult"
                                            type="number"
                                            value={data.max_adult}
                                            onChange={(e) =>
                                                setData(
                                                    "max_adult",
                                                    e.target.value
                                                )
                                            }
                                            error={
                                                clientErrors.max_adult ||
                                                errors.max_adult
                                            }
                                        />
                                        <InputLabeled
                                            label="Nombre maximum d'enfants"
                                            id="max_child"
                                            name="max_child"
                                            type="number"
                                            value={data.max_child}
                                            onChange={(e) =>
                                                setData(
                                                    "max_child",
                                                    e.target.value
                                                )
                                            }
                                            error={
                                                clientErrors.max_child ||
                                                errors.max_child
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <InputLabeled
                                            label="Surface (en m²)"
                                            id="surface"
                                            name="surface"
                                            type="number"
                                            value={data.surface}
                                            onChange={(e) =>
                                                setData(
                                                    "surface",
                                                    e.target.value
                                                )
                                            }
                                            error={
                                                clientErrors.surface ||
                                                errors.surface
                                            }
                                        />
                                        <InputLabeled
                                            label="Prix (€)"
                                            id="price"
                                            name="price"
                                            type="number"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                            error={
                                                clientErrors.price ||
                                                errors.price
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <InputLabeled
                                            label="Nombre de lits"
                                            id="bed_number"
                                            name="bed_number"
                                            type="number"
                                            value={data.bed_number}
                                            onChange={(e) =>
                                                setData(
                                                    "bed_number",
                                                    e.target.value
                                                )
                                            }
                                            error={
                                                clientErrors.bed_number ||
                                                errors.bed_number
                                            }
                                        />
                                    </div>
                                    <div className="w-full mb-3">
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Description
                                        </label>
                                        <ReactQuill
                                            theme="snow"
                                            value={data.description}
                                            onChange={(value) =>
                                                setData("description", value)
                                            }
                                            placeholder="Écrivez la description ici..."
                                            className="h-full mt-2"
                                        />
                                        {clientErrors.description && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {clientErrors.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="w-full mb-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Images
                                        </label>
                                        <div
                                            {...getRootProps()}
                                            className={`p-6 border-2 border-dashed rounded-md cursor-pointer ${
                                                isDragActive
                                                    ? "border-blue-500 bg-blue-100"
                                                    : "border-gray-300"
                                            }`}
                                        >
                                            <input {...getInputProps()} />
                                            {isDragActive ? (
                                                <p className="text-blue-600">
                                                    Déposez les fichiers ici...
                                                </p>
                                            ) : (
                                                <p className="text-gray-600">
                                                    Glissez et déposez des
                                                    fichiers ici, ou cliquez
                                                    pour sélectionner des
                                                    fichiers
                                                </p>
                                            )}
                                        </div>
                                        {data.images.length > 0 && (
                                            <div className="mt-2">
                                                <h4 className="text-sm font-semibold mb-2">
                                                    Images sélectionnées :
                                                </h4>
                                                <ul className="list-disc pl-5">
                                                    {data.images.map(
                                                        (file, index) => (
                                                            <li
                                                                key={index}
                                                                className="text-sm text-gray-700"
                                                            >
                                                                {file.name}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                        {clientErrors.images && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {clientErrors.images}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="float-right inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
