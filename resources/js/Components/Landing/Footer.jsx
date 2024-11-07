import React from "react";
import { FaArrowUp } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer bg-dark-footer relative text-gray-200 dark:text-gray-200">
            <div className="relative">
                <div className="absolute block w-full h-auto bottom-[25px] z-1 start-0">
                    <a href="#about">
                        <div className="mdi mdi-arrow-down absolute top-0 start-0 end-0 text-center inline-flex items-center justify-center rounded-full bg-white dark:bg-slate-900 h-12 w-12 mx-auto shadow-md dark:shadow-gray-800">
                            <FaArrowUp color="black" />
                        </div>
                    </a>
                </div>
            </div>
            <div className="py-[30px] px-0 border-t border-slate-800">
                <div className="container relative text-center">
                    <div className="grid grid-cols-1">
                        <div className="text-center">
                            <p className="mb-0">© FlyAway</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
