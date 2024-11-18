import { useState, useMemo } from "react";
import UserDashboardLayout from "../Layouts/UserDashboardLayout";
import DateFormat from "../../../../Components/Date/DateFormat";

const FidelityList = ({ data }) => {
    // Calculate totals using useMemo for efficiency
    const totals = useMemo(() => {
        let gainedPoints = 0;
        let lostPoints = 0;

        data.forEach((item) => {
            if (item.transaction_type_id === 1) {
                gainedPoints += item.point;
            } else {
                lostPoints += item.point;
            }
        });

        return { gainedPoints, lostPoints };
    }, [data]);

    return (
        <div className="container mx-auto p-6">
            {/* Points Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Gained Points Card */}
                <div className="bg-green-50 border border-green-200 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-green-700 mb-4">
                        Points Gagnés
                    </h2>
                    <p className="text-4xl font-bold text-green-800">
                        {totals.gainedPoints} points
                    </p>
                    <p className="text-sm text-green-600 mt-2">
                        Total des points accumulés grâce à vos activités.
                    </p>
                </div>

                {/* Lost Points Card */}
                <div className="bg-red-50 border border-red-200 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-red-700 mb-4">
                        Points Consommés
                    </h2>
                    <p className="text-4xl font-bold text-red-800">
                        {totals.lostPoints} points
                    </p>
                    <p className="text-sm text-red-600 mt-2">
                        Total des points utilisés pour des récompenses ou
                        services.
                    </p>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="border rounded-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-base text-gray-700 font-semibold py-3 text-left border-b px-4">
                                    Type
                                </th>
                                <th className="text-base text-gray-700 font-semibold py-3 text-left border-b px-4">
                                    Points
                                </th>
                                <th className="text-base text-gray-700 font-semibold py-3 text-left border-b px-4">
                                    Contexte
                                </th>
                                <th className="text-base text-gray-700 font-semibold py-3 text-left border-b px-4">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td className="whitespace-nowrap py-3 px-4">
                                        {item.transaction_type_id === 1 ? (
                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                Gain
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                                Consommation
                                            </span>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap py-3 px-4">
                                        <p className="text-black text-sm">
                                            {item.point} points
                                        </p>
                                    </td>
                                    <td className="whitespace-nowrap py-3 px-4">
                                        <p className="text-black text-sm">
                                            {item.subject}
                                        </p>
                                    </td>
                                    <td className="whitespace-nowrap py-3 px-4">
                                        <p className="text-black text-sm">
                                            {item.created_at ? (
                                                <DateFormat
                                                    date={item.created_at}
                                                />
                                            ) : (
                                                "-"
                                            )}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

FidelityList.layout = (page) => (
    <UserDashboardLayout title={"Ma balance fidélité"} children={page} />
);

export default FidelityList;
