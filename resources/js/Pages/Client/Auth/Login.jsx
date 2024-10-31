import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import ButtonSpinner from "../../../Components/Spinners/ButtonSpinner";
import { Head, useForm } from "@inertiajs/react";

function Login() {
    const [isLoading] = useState(false);
    const { data, setData, errors, post } = useForm({
        email: "johndoe@example.com",
        password: "secret",
        remember: true,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("client.login.action"));
    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
                >
                    FlyAway
                </a>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Se connecter
                        </h1>

                        {/* Display general error message */}
                        {errors.general && (
                            <div className="bg-red-100 text-red-700 p-4 rounded">
                                {errors.general}
                            </div>
                        )}

                        <form
                            className="space-y-4 md:space-y-6"
                            action="#"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className={`bg-gray-50 border ${
                                        errors.email
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                    placeholder="name@company.com"
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Mot de passe
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className={`bg-gray-50 border ${
                                        errors.password
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked
                                                )
                                            }
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500"
                                        >
                                            Se rappeler de moi
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-primary-600 hover:underline"
                                >
                                    Mot de passe oublié?
                                </a>
                            </div>
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="w-full justify-center text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                            >
                                {isLoading ? <ButtonSpinner /> : "Se connecter"}
                            </button>

                            <p className="text-sm font-light text-gray-500">
                                Vous n'avez pas encore de compte?{" "}
                                <Link
                                    className="font-medium text-primary-600 hover:underline"
                                    href={route('client.register.show')}
                                >
                                    Créer un
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
