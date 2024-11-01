import React from "react";
import { MdGppBad } from "react-icons/md";

export default function DangerMessage({ title = null, text }) {
    return (
        <div className="flex gap-4 bg-red-100 p-4 rounded-md">
            <div className="w-max">
                <div className="h-10 w-10 flex rounded-full bg-gradient-to-b from-red-100 to-red-300 text-red-700">
                    <MdGppBad size={20} className="m-auto" />
                </div>
            </div>
            <div className="space-y-1 text-sm">
                <h6 className="font-medium text-red-900">{title}</h6>
                <p className="text-red-700 leading-tight">{text}</p>
            </div>
        </div>
    );
}
