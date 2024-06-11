import React, { useState } from "react";
import "./Settings.scss";
import { useCompany } from "../../context/CompanyContext"; // Adjust the import path as needed
import Dropdown from "../Dropdown/Dropdown";

const Settings: React.FC = () => {
  const company = useCompany(); // Get the company context
  const { observerdHotels, settings, username } = company;
  const { hotelColors } = settings;

  // Initialize colors from settings
  const initialColors = Array.from(hotelColors.values());

  const [colors, setColors] = useState<string[]>(initialColors);

  const handleColorChange = (selectedValue: string, index: number) => {
    const newColors = [...colors];
    const initialColor = colors[index] || selectedValue; // Use selectedValue if initial is undefined
    newColors[index] = selectedValue;
    setColors(newColors);

    // Update the company settings (this assumes you have a way to update the context)
    const hotelNames = Array.from(hotelColors.keys());
    const newHotelColors = new Map(hotelColors);
    newHotelColors.set(hotelNames[index], selectedValue);
    company.settings.hotelColors = newHotelColors;
    // setCompany({...company, settings: { ...company.settings, hotelColors: newHotelColors }});
    console.log(company);
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
    { value: "#FFC107", label: "Amber" },
  ];

  const dropdowns: JSX.Element[] = Array.from(observerdHotels.values()).map((hotel, hotelIndex) => (
    <Dropdown
      key={hotel.id}
      initialValue={colors[hotelIndex] || selectedValue} // Use selectedValue if initial is undefined
      label={`Select color for ${hotel.name}`}
      options={dropdownOptions}
      onChange={(selectedValue) => handleColorChange(selectedValue, hotelIndex)}
    />
  ));

  return (
    <div className="settings-container">
      <h1>Settings for {username}</h1>
      <div className="dropdowns">
        {dropdowns}
      </div>
    </div>
  );
};

export default Settings;