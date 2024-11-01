import React from "react";

export default function MoreDangerMessage({ title, text }) {
    return (
        <div class="flex gap-4 bg-red-500 p-4 rounded-md">
            <div class="w-max">
                <div class="h-10 w-10 flex rounded-full bg-gradient-to-b from-red-100 to-red-300 text-red-700">
                    <span
                        class="material-icons material-icons-outlined m-auto"
                        style="font-size:20px"
                    >
                        gpp_bad
                    </span>
                </div>
            </div>
            <div class="space-y-1 text-sm">
                <h6 class="font-medium text-white">{title}</h6>
                <p class="text-red-100 leading-tight">{text}</p>
            </div>
        </div>
    );
}
