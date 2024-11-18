import React from "react";
import { format } from "date-fns";

function DateFormat({ date }) {
    return format(new Date(date), "dd/MM/yyyy");
}

export default DateFormat;
