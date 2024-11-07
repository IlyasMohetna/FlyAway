import { useState, useEffect } from "react";
import "../../css/landing.css";
import NavigationBar from "../Components/Landing/NavigationBar";
import Footer from "../Components/Landing/Footer";
import SearchTypeIconCards from "../Components/Landing/SearchTypeIconCards";

const Home = () => {
    return (
        <>
            <NavigationBar />

            <section
                className="relative py-36 bg-[url('/assets/img/landing_hero.jpg')] bg-cover jarallax"
                data-jarallax=""
                data-speed="0.5"
            >
                <div className="absolute inset-0 bg-slate-900/40" />
                <div className="container relative">
                    <div className="grid lg:grid-cols-12 md:grid-cols-2 mt-10 items-center gap-6">
                        <div className="lg:col-span-5">
                            <h5 className="text-3xl font-dancing text-white">
                                Trouvez votre séjour idéal
                            </h5>
                            <h4 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-6xl mb-6 mt-5">
                                Où veux-tu aller ?
                            </h4>
                            <p className="text-white/70 text-xl max-w-xl">
                                Vous planifiez un voyage? Nous organiserons
                                votre voyage avec les meilleurs endroits et dans
                                le meilleur budget !
                            </p>
                            <div className="mt-6">
                                <a
                                    href=""
                                    className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md"
                                >
                                    Voir tout les forfaits
                                </a>
                            </div>
                        </div>
                        <div className="lg:col-span-6">
                            <div className="bg-white dark:bg-slate-900 rounded-xl shadow dark:shadow-gray-800 p-6 z-10 relative lg:ms-10">
                                <h4 className="mb-5 text-2xl font-semibold">
                                    Rechercher une destination
                                </h4>
                                <form>
                                    <div className="grid grid-cols-1 gap-3">
                                        <SearchTypeIconCards />
                                        <div>
                                            <label className="form-label font-medium text-slate-900 dark:text-white">
                                                Search:
                                            </label>
                                            <div className="relative mt-2">
                                                <i
                                                    data-feather="search"
                                                    className="size-[18px] absolute top-[10px] start-3"
                                                />
                                                <input
                                                    name="name"
                                                    type="text"
                                                    id="job-keyword"
                                                    className="w-full py-2 px-3 ps-10 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                    placeholder="Search"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="form-label font-medium text-slate-900 dark:text-white">
                                                Select Your Date:
                                            </label>
                                            <div className="relative mt-2">
                                                <i
                                                    data-feather="calendar"
                                                    className="size-[18px] absolute top-[10px] start-3"
                                                />
                                                <input
                                                    name="name"
                                                    type="text"
                                                    id="job-keyword"
                                                    className="w-full py-2 px-3 ps-10 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 start"
                                                    placeholder="Select Your Date"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="form-label font-medium text-slate-900 dark:text-white">
                                                Select Your Date:
                                            </label>
                                            <div className="relative mt-2">
                                                <i
                                                    data-feather="calendar"
                                                    className="size-[18px] absolute top-[10px] start-3"
                                                />
                                                <input
                                                    name="name"
                                                    type="text"
                                                    id="job-keyword"
                                                    className="w-full py-2 px-3 ps-10 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 end"
                                                    placeholder="Select Your Date"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="form-label font-medium text-slate-900 dark:text-white">
                                                No. of Person:
                                            </label>
                                            <div className="relative mt-2">
                                                <i
                                                    data-feather="users"
                                                    className="size-[18px] absolute top-[10px] start-3"
                                                />
                                                <select className="form-select w-full py-2 px-3 ps-10 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0">
                                                    <option defaultValue>
                                                        No. of person
                                                    </option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="">
                                            <input
                                                type="submit"
                                                id="search-buy"
                                                name="search"
                                                className="py-1 px-5 h-10 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md w-full cursor-pointer"
                                                defaultValue="Search"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Home;
