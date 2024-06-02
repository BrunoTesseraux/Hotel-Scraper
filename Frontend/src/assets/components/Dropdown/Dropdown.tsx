import React, { useState } from "react";
import"./Dropdown.scss"

// So einzubinden
// 
// const dropdownOptions = [
//     { value: "red", label: "Red" },
//     { value: "blue", label: "Blue" },
//     { value: "green", label: "Green" }
//   ];

interface DropdownProps {
    initialValue: string;
    options: { value: string; label: string; }[];
    onChange: (selectedValue: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ initialValue, options, onChange }) => {
    const [selectedValue, setSelectedValue] = useState<string>(initialValue);

    const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedValue(value);
        onChange(value);
    };

    return (
        <div className="dropdown-container">
            <label htmlFor="dropdown">Select:</label>
            <select id="dropdown" value={selectedValue} onChange={handleValueChange} style={{backgroundColor: selectedValue}}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;