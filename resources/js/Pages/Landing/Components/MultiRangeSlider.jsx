import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../../../../css/MultiRangeSlider.css"; // Custom CSS for additional styling

const MultiRangeSlider = ({ min, max, label, unit, onChange }) => {
    const [range, setRange] = useState([Number(min), Number(max)]);

    const handleSliderChange = (values) => {
        setRange(values);
        onChange(values); // Pass the values up to the parent component
    };

    return (
        <div className="slider-container">
            <h3 className="font-medium text-gray-800 mb-4">{label}</h3>
            <Slider
                range
                min={Number(min)}
                max={Number(max)}
                defaultValue={[Number(min), Number(max)]}
                value={range}
                onChange={handleSliderChange}
                trackStyle={[{ backgroundColor: "#3b82f6", height: 6 }]}
                handleStyle={[
                    { backgroundColor: "#3b82f6", borderColor: "#3b82f6" },
                    { backgroundColor: "#3b82f6", borderColor: "#3b82f6" },
                ]}
                railStyle={{ backgroundColor: "#e2e8f0", height: 6 }}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>
                    {unit}
                    {range[0]}
                </span>
                <span>
                    {unit}
                    {range[1]}
                </span>
            </div>
        </div>
    );
};

export default MultiRangeSlider;
