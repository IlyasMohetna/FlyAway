import React, { useState, Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaTrashAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";
import ReactQuill, { Quill } from "react-quill";
import QuillResizeImage from "quill-resize-image";
import "react-quill/dist/quill.snow.css";

// Register QuillResizeImage module
Quill.register("modules/resize", QuillResizeImage);

export default function ItineraryManagementModal({
    open,
    setOpen,
    itineraryDays,
    setItineraryDays,
}) {
    const [selectedDayIndex, setSelectedDayIndex] = useState(null);
    const [selectedStepIndex, setSelectedStepIndex] = useState(null);
    const [currentStep, setCurrentStep] = useState({
        title: "",
        description: "",
    });
    const quillRef = useRef(null);

    useEffect(() => {
        if (!open) {
            setSelectedDayIndex(null);
            setSelectedStepIndex(null);
            setCurrentStep({ title: "", description: "" });
        }
    }, [open]);

    useEffect(() => {
        // When modal is opened, reset the current step to ensure correct data is displayed
        if (open && selectedDayIndex !== null && selectedStepIndex !== null) {
            const step =
                itineraryDays[selectedDayIndex].steps[selectedStepIndex];
            setCurrentStep({
                title: step.title,
                description: step.description,
            });
        }
    }, [open, selectedDayIndex, selectedStepIndex, itineraryDays]);

    const handleTreeClick = (dayIndex) => {
        setSelectedDayIndex(dayIndex);
        setSelectedStepIndex(null);
        setCurrentStep({ title: "", description: "" });
    };

    const handleStepClick = (dayIndex, stepIndex) => {
        setSelectedDayIndex(dayIndex);
        setSelectedStepIndex(stepIndex);
        const step = itineraryDays[dayIndex].steps[stepIndex];
        setCurrentStep({ title: step.title, description: step.description });
    };

    const handleItineraryStepChange = (field, value) => {
        setCurrentStep((prevStep) => ({ ...prevStep, [field]: value }));
    };

    const addOrUpdateItineraryStep = () => {
        if (!currentStep.title || !currentStep.description) {
            return;
        }

        const updatedDays = [...itineraryDays];
        if (selectedStepIndex !== null) {
            updatedDays[selectedDayIndex].steps[selectedStepIndex] =
                currentStep;
        } else {
            updatedDays[selectedDayIndex].steps.push(currentStep);
        }
        setItineraryDays(updatedDays); // This will also update the form data through the passed `setItineraryDays`
        setCurrentStep({ title: "", description: "" });
        setSelectedStepIndex(null);
    };

    const removeItineraryStep = (dayIndex, stepIndex) => {
        const updatedDays = [...itineraryDays];
        updatedDays[dayIndex].steps.splice(stepIndex, 1);
        setItineraryDays(updatedDays);
    };

    const moveStepUp = (dayIndex, stepIndex) => {
        if (stepIndex <= 0) return;

        const updatedDays = [...itineraryDays];
        const steps = updatedDays[dayIndex].steps;
        [steps[stepIndex - 1], steps[stepIndex]] = [
            steps[stepIndex],
            steps[stepIndex - 1],
        ];
        setItineraryDays(updatedDays);
    };

    const moveStepDown = (dayIndex, stepIndex) => {
        const updatedDays = [...itineraryDays];
        const steps = updatedDays[dayIndex].steps;

        if (stepIndex >= steps.length - 1) return;
        [steps[stepIndex], steps[stepIndex + 1]] = [
            steps[stepIndex + 1],
            steps[stepIndex],
        ];
        setItineraryDays(updatedDays);
    };

    const quillModules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline", "strike"],
            ["link", "image"],
            ["clean"],
        ],
        resize: {
            locale: {},
        },
    };

    const handleImageUpload = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const quillEditor = quillRef.current.getEditor();
                    const range = quillEditor.getSelection();
                    quillEditor.insertEmbed(
                        range.index,
                        "image",
                        reader.result
                    );
                };
                reader.readAsDataURL(file);
            }
        };
    };

    const handleSaveAndClose = () => {
        // Save itinerary data before closing
        addOrUpdateItineraryStep();
        setOpen(false);
    };

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 bg-opacity-30"
                onClose={handleSaveAndClose}
            >
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-2xl font-semibold leading-6 text-gray-900 border-b pb-4 mb-6"
                            >
                                Gestion des étapes d'itinéraire
                            </Dialog.Title>
                            <div className="flex mt-4 gap-6">
                                {/* Left Section: Days List */}
                                <div className="w-1/3 p-4 border-r border-gray-300 overflow-y-auto max-h-96">
                                    {itineraryDays.map((day, index) => (
                                        <div
                                            key={`day-${index}`}
                                            className="mb-6"
                                        >
                                            <h4
                                                className={`cursor-pointer text-lg font-semibold ${
                                                    index === selectedDayIndex
                                                        ? "text-blue-600"
                                                        : "text-gray-800"
                                                } hover:text-blue-500 transition-all duration-200`}
                                                onClick={() =>
                                                    handleTreeClick(index)
                                                }
                                            >
                                                Jour {day.day}
                                            </h4>
                                            {index === selectedDayIndex && (
                                                <div>
                                                    {day.steps.map(
                                                        (step, stepIndex) => (
                                                            <div
                                                                key={`step-${stepIndex}`}
                                                                className={`ml-6 mt-3 flex items-center rounded-md p-3 cursor-pointer transition-all duration-200 ${
                                                                    index ===
                                                                        selectedDayIndex &&
                                                                    stepIndex ===
                                                                        selectedStepIndex
                                                                        ? "bg-gray-300"
                                                                        : "bg-gray-100 hover:bg-gray-200"
                                                                }`}
                                                                onClick={() =>
                                                                    handleStepClick(
                                                                        index,
                                                                        stepIndex
                                                                    )
                                                                }
                                                            >
                                                                <p className="text-sm flex-grow text-gray-700 font-medium">
                                                                    {step.title}
                                                                </p>
                                                                <div className="flex items-center gap-2">
                                                                    <button
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            e.stopPropagation();
                                                                            moveStepUp(
                                                                                index,
                                                                                stepIndex
                                                                            );
                                                                        }}
                                                                        className="text-gray-600 hover:text-gray-800 transition-all duration-200"
                                                                    >
                                                                        <FaArrowUp />
                                                                    </button>
                                                                    <button
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            e.stopPropagation();
                                                                            moveStepDown(
                                                                                index,
                                                                                stepIndex
                                                                            );
                                                                        }}
                                                                        className="text-gray-600 hover:text-gray-800 transition-all duration-200"
                                                                    >
                                                                        <FaArrowDown />
                                                                    </button>
                                                                    <button
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            e.stopPropagation();
                                                                            removeItineraryStep(
                                                                                index,
                                                                                stepIndex
                                                                            );
                                                                        }}
                                                                        className="text-red-600 hover:text-red-800 transition-all duration-200"
                                                                    >
                                                                        <FaTrashAlt />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Right Section: Add/Edit Step */}
                                <div className="w-2/3 p-6 bg-gray-50 rounded-md shadow-sm">
                                    {selectedDayIndex !== null && (
                                        <div className="space-y-6">
                                            <h4 className="text-xl font-semibold text-gray-800 mb-4">
                                                {selectedStepIndex !== null
                                                    ? `Modifier l'étape pour Jour ${
                                                          selectedDayIndex + 1
                                                      }`
                                                    : `Ajouter une nouvelle étape pour Jour ${
                                                          selectedDayIndex + 1
                                                      }`}
                                            </h4>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Titre de l'étape
                                            </label>
                                            <input
                                                type="text"
                                                value={currentStep.title}
                                                onChange={(e) =>
                                                    handleItineraryStepChange(
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                                placeholder="Entrez le titre de l'étape"
                                            />
                                            <label
                                                htmlFor="step-description"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Description de l'étape
                                            </label>
                                            <div className="bg-white border border-gray-300 rounded-lg mb-4 overflow-hidden">
                                                <ReactQuill
                                                    ref={quillRef}
                                                    value={
                                                        currentStep.description
                                                    }
                                                    onChange={(value) =>
                                                        handleItineraryStepChange(
                                                            "description",
                                                            value
                                                        )
                                                    }
                                                    modules={quillModules}
                                                    className="h-64 quill-editor"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={
                                                    addOrUpdateItineraryStep
                                                }
                                                className={`inline-flex justify-center rounded-md border border-transparent ${
                                                    currentStep.title &&
                                                    currentStep.description
                                                        ? "bg-green-600 hover:bg-green-700"
                                                        : "bg-gray-400 cursor-not-allowed"
                                                } px-5 py-3 text-sm font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                                    currentStep.title &&
                                                    currentStep.description
                                                        ? "focus:ring-green-500"
                                                        : ""
                                                }`}
                                                disabled={
                                                    !currentStep.title ||
                                                    !currentStep.description
                                                }
                                            >
                                                {selectedStepIndex !== null
                                                    ? "Enregistrer l'étape"
                                                    : "Ajouter cette étape"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end mt-8">
                                <button
                                    type="button"
                                    onClick={handleSaveAndClose}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Enregistrer les étapes d'itinéraire
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
