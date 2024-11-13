import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import InputLabeled from "../../../../../Components/Form/Pack/InputLabeled";
import { useForm } from "@inertiajs/react";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import DynamicSelect from "../../Lodging/Components/Form/DynamicSelect";

export default function AddPackageDetailModal({ open, setOpen }) {
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Le titre est requis"),
        amount_ht: Yup.number()
            .nullable()
            .transform((value, originalValue) =>
                String(originalValue).trim() === "" ? null : value
            )
            .required("Le montant HT est requis"),
        amount_ttc: Yup.number()
            .nullable()
            .transform((value, originalValue) =>
                String(originalValue).trim() === "" ? null : value
            )
            .required("Le montant TTC est requis"),
        duration: Yup.number()
            .nullable()
            .transform((value, originalValue) =>
                String(originalValue).trim() === "" ? null : value
            )
            .required("La durée est requise"),
        description: Yup.string().required("La description est requise"),
        package_type_id: Yup.string().required("Le type de forfait est requis"),
        destination_id: Yup.string().required("La destination est requise"),
        images: Yup.array()
            .min(1, "Vous devez télécharger au moins une image.")
            .required("Les images sont requises."),
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        amount_ht: "",
        amount_ttc: "",
        duration: "",
        description: "",
        package_type_id: "",
        destination_id: "",
        lodging_options: [], // Lodging options for multi-select
        images: [],
    });

    const [clientErrors, setClientErrors] = useState({});

    const onDrop = (acceptedFiles) => {
        setData("images", [...data.images, ...acceptedFiles]);
        removeClientError("images");
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
            formData.append("title", data.title);
            formData.append("amount_ht", data.amount_ht);
            formData.append("amount_ttc", data.amount_ttc);
            formData.append("duration", data.duration);
            formData.append("description", data.description);
            formData.append("package_type_id", data.package_type_id);
            formData.append("destination_id", data.destination_id);
            data.images.forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });

            post(route("package.store"), {
                data: formData,
                onSuccess: () => setOpen(false),
                forceFormData: true,
            });
        } catch (validationErrors) {
            const formattedErrors = {};
            validationErrors.inner.forEach((error) => {
                formattedErrors[error.path] = error.message;
            });
            setClientErrors(formattedErrors);
        }
    };

    const removeClientError = (field) => {
        setClientErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[field];
            return newErrors;
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
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Ajouter un détail de forfait
                                </Dialog.Title>
                                <form onSubmit={handleSubmit} className="mt-4">
                                    {/* Grouped fields in rows */}
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <InputLabeled
                                            label="Titre"
                                            id="title"
                                            name="title"
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => {
                                                setData(
                                                    "title",
                                                    e.target.value
                                                );
                                                removeClientError("title");
                                            }}
                                            error={
                                                clientErrors.title ||
                                                errors.title
                                            }
                                        />

                                        <InputLabeled
                                            label="Durée (jours)"
                                            id="duration"
                                            name="duration"
                                            type="number"
                                            value={data.duration}
                                            onChange={(e) => {
                                                setData(
                                                    "duration",
                                                    e.target.value
                                                );
                                                removeClientError("duration");
                                            }}
                                            error={
                                                clientErrors.duration ||
                                                errors.duration
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <InputLabeled
                                            label="Montant HT"
                                            id="amount_ht"
                                            name="amount_ht"
                                            type="number"
                                            value={data.amount_ht}
                                            onChange={(e) => {
                                                setData(
                                                    "amount_ht",
                                                    e.target.value
                                                );
                                                removeClientError("amount_ht");
                                            }}
                                            error={
                                                clientErrors.amount_ht ||
                                                errors.amount_ht
                                            }
                                        />
                                        <InputLabeled
                                            label="Montant TTC"
                                            id="amount_ttc"
                                            name="amount_ttc"
                                            type="number"
                                            value={data.amount_ttc}
                                            onChange={(e) => {
                                                setData(
                                                    "amount_ttc",
                                                    e.target.value
                                                );
                                                removeClientError("amount_ttc");
                                            }}
                                            error={
                                                clientErrors.amount_ttc ||
                                                errors.amount_ttc
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <div>
                                            <DynamicSelect
                                                label="Type de forfait"
                                                name="package_type_id"
                                                selectedValue={
                                                    data.package_type_id
                                                }
                                                handleInputChange={(
                                                    name,
                                                    value
                                                ) => {
                                                    setData(name, value);
                                                    removeClientError(name);
                                                }}
                                                fetchRoute={route(
                                                    "select.package_type"
                                                )}
                                                errors={clientErrors}
                                                noOptionsMessage="Veuillez sélectionner un type de forfait !"
                                                placeholder="Sélectionner une option"
                                            />
                                            {clientErrors.package_type_id && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {
                                                        clientErrors.package_type_id
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <DynamicSelect
                                                label="Destination"
                                                name="destination_id"
                                                selectedValue={
                                                    data.destination_id
                                                }
                                                handleInputChange={(
                                                    name,
                                                    value
                                                ) => {
                                                    setData(name, value);
                                                    removeClientError(name);
                                                }}
                                                fetchRoute={route(
                                                    "select.city"
                                                )}
                                                errors={clientErrors}
                                                noOptionsMessage="Veuillez sélectionner une ville !"
                                                placeholder="Sélectionner une option"
                                            />
                                            {clientErrors.destination_id && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {
                                                        clientErrors.destination_id
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <div>
                                            <DynamicSelect
                                                label="Options d'hébergements"
                                                name="lodging_options"
                                                selectedValue={
                                                    data.lodging_options
                                                }
                                                handleInputChange={(
                                                    name,
                                                    value
                                                ) => {
                                                    setData(name, value);
                                                    removeClientError(name);
                                                }}
                                                fetchRoute={route(
                                                    "select.lodging"
                                                )}
                                                errors={clientErrors}
                                                noOptionsMessage="Veuillez sélectionner des options d'hébergements !"
                                                placeholder="Sélectionner une ou plusieurs options"
                                                multiple={true}
                                            />
                                            {clientErrors.lodging_options && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {
                                                        clientErrors.lodging_options
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <DynamicSelect
                                                label="Options de transports"
                                                name="transportation_options"
                                                selectedValue={
                                                    data.transportation_options
                                                }
                                                handleInputChange={(
                                                    name,
                                                    value
                                                ) => {
                                                    setData(name, value);
                                                    removeClientError(name);
                                                }}
                                                fetchRoute={route(
                                                    "select.transport"
                                                )}
                                                errors={clientErrors}
                                                noOptionsMessage="Veuillez sélectionner des options de transports !"
                                                placeholder="Sélectionner une ou plusieurs options"
                                                multiple={true}
                                            />
                                            {clientErrors.transportation_options && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {
                                                        clientErrors.transportation_options
                                                    }
                                                </p>
                                            )}
                                        </div>
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
                                            onChange={(value) => {
                                                setData("description", value);
                                                removeClientError(
                                                    "description"
                                                );
                                            }}
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
