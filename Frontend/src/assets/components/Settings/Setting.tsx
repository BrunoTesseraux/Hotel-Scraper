import React, { useState } from "react";
import "./Settings.scss";
import { useHotelContext } from "../../context/HotelPricescontext";
import Dropdown from "../Dropdown/Dropdown";

const Settings: React.FC = () => {
    const { hotelData, setHotelData } = useHotelContext(); // Get hotelData and setHotelData from context

    const initialColors = [
        "#F44336", "#E91E63", "#9C27B0", "#3F51B5", "#2196F3", "#FF9800", "#4CAF50", "#FFC107"
    ];
    
    const [colors, setColors] = useState<string[]>(initialColors);
    
    const handleColorChange = (selectedValue: string, index: number) => {
        const newColors = [...colors];
        newColors[index] = selectedValue;
        setColors(newColors);

        // Update hotel data with new colors
        const updatedHotelData = hotelData.map((hotel, hotelIndex) => {
            if (index === hotelIndex * 2) {
                // Update currentPrice color
                return {
                    ...hotel,
                    currentPriceColor: selectedValue
                };
            } else if (index === hotelIndex * 2 + 1) {
                // Update priceInOneMonth color
                return {
                    ...hotel,
                    priceInOneMonthColor: selectedValue
                };
            }
            return hotel;
        });
        setHotelData(updatedHotelData);
        console.log(hotelData);
        
    };
    
    // Dropdown options
    const dropdownOptions = [
        { value: "#F44336", label: "Red" },
        { value: "#E91E63", label: "Pink" },
        { value: "#9C27B0", label: "Purple" },
        { value: "#3F51B5", label: "Indigo" },
        { value: "#2196F3", label: "Blue" },
        { value: "#FF9800", label: "Orange" },
        { value: "#4CAF50", label: "Green" },
        { value: "#FFC107", label: "Amber" }
    ];

    const currentPriceDropdowns: JSX.Element[] = hotelData.map((hotel, hotelIndex) => (
        <Dropdown
            key={`${hotel._id}-current`}
            initialValue={colors[hotelIndex * 2]}
            label={`Select color for Current Price (${hotel.hotel})`}
            options={dropdownOptions}
            onChange={(selectedValue) => handleColorChange(selectedValue, hotelIndex * 2)}
        />
    ));

    const priceInOneMonthDropdowns: JSX.Element[] = hotelData.map((hotel, hotelIndex) => (
        <Dropdown
            key={`${hotel._id}-oneMonth`}
            initialValue={colors[hotelIndex * 2 + 1]}
            label={`Select color for Price in One Month (${hotel.hotel})`}
            options={dropdownOptions}
            onChange={(selectedValue) => handleColorChange(selectedValue, hotelIndex * 2 + 1)}
        />
    ));

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <div className="dropdowns">
                <div className="current-price-dropdowns">
                    {currentPriceDropdowns}
                </div>
                <div className="price-in-one-month-dropdowns">
                    {priceInOneMonthDropdowns}
                </div>
            </div>
        </div>
    );
};

export default Settings;