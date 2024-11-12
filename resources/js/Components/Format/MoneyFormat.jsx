import React from "react";

const MoneyFormat = ({ money }) => {
    const formatMoney = (value) => {
        if (isNaN(value)) {
            value = Number(value);
        }
        return `${value} €`;
    };

    return <div>{formatMoney(money)}</div>;
};

export default MoneyFormat;
