import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import ButtonSpinner from "../../../Components/Spinners/ButtonSpinner";
import DangerMessage from "../../../Components/Error/DangerMessage";
import { Head, useForm } from "@inertiajs/react";

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const { data, setData, errors, post } = useForm({
        email: "",
        password: "",
        remember: true,
    });

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        post(route("admin.login.action"), {
            onFinish: () => setIsLoading(false),
        });
    }

    return (
        <div className="font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
                    <div className="md:max-w-md w-full px-4 py-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <h3 className="text-gray-800 text-3xl font-extrabold">
                                    Admin FlyAway
                                </h3>
                            </div>

                            {errors.general && (
                                <DangerMessage text={errors.general} />
                            )}

                            <div>
                                <label className="text-gray-800 text-xs block mb-2 mt-4">
                                    Email
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        name="email"
                                        type="text"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className={`w-full text-gray-800 text-sm border-b ${
                                            errors.email
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } focus:border-blue-600 px-2 py-3 outline-none`}
                                        placeholder="Enter email"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8">
                                <label className="text-gray-800 text-xs block mb-2">
                                    Password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className={`w-full text-gray-800 text-sm border-b ${
                                            errors.password
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } focus:border-blue-600 px-2 py-3 outline-none`}
                                        placeholder="Enter password"
                                        required
                                    />
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                        className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="ml-3 block text-sm text-gray-800"
                                    >
                                        Se rappeler de moi
                                    </label>
                                </div>
                            </div>

                            <div className="mt-12">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                >
                                    {isLoading ? (
                                        <ButtonSpinner />
                                    ) : (
                                        "Se connecter"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="md:h-full bg-[#000842] rounded-xl lg:p-12 p-8">
                        <img
                            src="/assets/img/logo.svg"
                            className="w-full h-full object-contain"
                            alt="login-image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
