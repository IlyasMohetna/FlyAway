import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const MultiRangeSlider = ({ min, max, label, unit, value, onChange }) => {
    return (
        <div className="slider-container">
            <h3 className="font-medium text-gray-800 mb-4">{label}</h3>
            <Slider
                range
                min={Number(min)}
                max={Number(max)}
                value={value}
                onChange={onChange}
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
                    {value[0]}
                </span>
                <span>
                    {unit}
                    {value[1]}
                </span>
            </div>
        </div>
    );
};

export default MultiRangeSlider;
