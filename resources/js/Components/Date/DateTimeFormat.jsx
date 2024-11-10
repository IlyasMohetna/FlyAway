import React from "react";
import { format } from "date-fns";

function DateTimeFormat({ datetime }) {
    return format(new Date(datetime), "dd/MM/yyyy à HH:mm");
}

export default DateTimeFormat;
