import React, { useState } from "react";

const ItineraryPreview = ({ days }) => {
    const [activeDay, setActiveDay] = useState(null);

    const toggleDay = (index) => {
        setActiveDay(activeDay === index ? null : index);
    };

    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                maxWidth: "600px",
                margin: "auto",
            }}
        >
            {Object.entries(days).map(([day, steps], index) => (
                <div
                    key={day}
                    style={{
                        marginBottom: "20px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <div
                        onClick={() => toggleDay(index)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            backgroundColor:
                                activeDay === index ? "#007bff" : "#f0f0f0",
                            color: activeDay === index ? "#fff" : "#333",
                            padding: "15px",
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "24px",
                                marginRight: "10px",
                                color: activeDay === index ? "#fff" : "#007bff",
                            }}
                        >
                            ○
                        </span>
                        <h3
                            style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                margin: 0,
                            }}
                        >
                            {`Jour ${day}`}
                        </h3>
                    </div>
                    <div
                        style={{
                            maxHeight: activeDay === index ? "1000px" : "0",
                            overflow: "hidden",
                            transition: "max-height 0.5s ease",
                            backgroundColor: "#fff",
                            padding: activeDay === index ? "15px" : "0 15px",
                        }}
                    >
                        {activeDay === index && (
                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    marginTop: "10px",
                                }}
                            >
                                {steps.map((step, i) => (
                                    <li
                                        key={i}
                                        style={{ marginBottom: "10px" }}
                                    >
                                        <h4
                                            style={{
                                                fontSize: "18px",
                                                color: "#333",
                                            }}
                                        >
                                            {step.title}
                                        </h4>
                                        <p
                                            style={{
                                                fontSize: "16px",
                                                color: "#555",
                                            }}
                                        >
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: step.description,
                                                }}
                                            />
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItineraryPreview;
