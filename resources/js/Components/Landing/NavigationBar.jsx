import React from "react";

function NavigationBar() {
    return (
        <nav id="topnav" className="w-full z-10 mt-2 px-4 lg:px-8">
            <div className="container mx-auto flex justify-between items-center h-16 mt-4">
                <a className="logo flex items-center" href="index.html">
                    <span className="inline-block dark:hidden">
                        <img
                            src="/assets/img/logo.svg"
                            alt="Logo Dark"
                            className="w-28"
                        />
                    </span>
                </a>

                <div id="navigation" className={"block lg:block"}>
                    <ul className="flex space-x-6 items-center text-white">
                        <li className="relative has-submenu">
                            <a
                                href="javascript:void(0)"
                                className="hover:text-red-500"
                            >
                                Hero
                            </a>
                            <ul className="absolute left-0 mt-2 p-2 bg-white dark:bg-gray-800 shadow-lg rounded hidden group-hover:block">
                                <li>
                                    <a
                                        href="index.html"
                                        className="sub-menu-item block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-red-500"
                                    >
                                        Tour One
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="index-two.html"
                                        className="sub-menu-item block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-red-500"
                                    >
                                        Tour Two
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="relative has-submenu">
                            <a
                                href="javascript:void(0)"
                                className="hover:text-red-500"
                            >
                                Listing
                            </a>
                            <ul className="absolute left-0 mt-2 p-2 bg-white dark:bg-gray-800 shadow-lg rounded hidden group-hover:block">
                                <li className="has-submenu relative">
                                    <a
                                        href="javascript:void(0)"
                                        className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-red-500"
                                    >
                                        Tour Grid
                                    </a>
                                    <ul className="absolute left-full top-0 mt-2 p-2 bg-white dark:bg-gray-800 shadow-lg rounded hidden group-hover:block">
                                        <li>
                                            <a
                                                href="grid.html"
                                                className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-red-500"
                                            >
                                                Grid
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="grid-left-sidebar.html"
                                                className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-red-500"
                                            >
                                                Grid Left Sidebar
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                        {/* Blog */}
                        <li>
                            <a href="blogs.html" className="hover:text-red-500">
                                Blog
                            </a>
                        </li>

                        <li>
                            <a
                                href="contact.html"
                                className="hover:text-red-500"
                            >
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;
