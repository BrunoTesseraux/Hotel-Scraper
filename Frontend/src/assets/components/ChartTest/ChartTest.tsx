import React, { useState } from "react";
import "./ChartTest.scss";
import { HotelData } from "../../../types";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Dropdown from "../Dropdown/Dropdown";

const ChartTest: React.FC = () => {
  const [hotelData] = useState<HotelData[]>([
    {
      _id: "60f8d5a2c2b5b814c8b7b44b",
      hotel: "Lakeside Lodge",
      breakfastIncluded: true,
      stars: 4,
      prices: [
        { currentPrice: 120, priceInOneMonth: 130, dateOfRequest: "2023-05-22T00:00:00Z" },
        { currentPrice: 125, priceInOneMonth: 135, dateOfRequest: "2023-05-23T00:00:00Z" },
        { currentPrice: 130, priceInOneMonth: 140, dateOfRequest: "2023-05-24T00:00:00Z" },
        { currentPrice: 128, priceInOneMonth: 138, dateOfRequest: "2023-05-25T00:00:00Z" },
        { currentPrice: 132, priceInOneMonth: 142, dateOfRequest: "2023-05-26T00:00:00Z" },
        { currentPrice: 135, priceInOneMonth: 145, dateOfRequest: "2023-05-27T00:00:00Z" },
        { currentPrice: 140, priceInOneMonth: 150, dateOfRequest: "2023-05-28T00:00:00Z" },
      ],
    },
    {
      _id: "60f8d5a2c2b5b814c8b7b44c",
      hotel: "Mountain Retreat",
      breakfastIncluded: false,
      stars: 5,
      prices: [
        { currentPrice: 200, priceInOneMonth: 210, dateOfRequest: "2023-05-22T00:00:00Z" },
        { currentPrice: 205, priceInOneMonth: 215, dateOfRequest: "2023-05-23T00:00:00Z" },
        { currentPrice: 210, priceInOneMonth: 220, dateOfRequest: "2023-05-24T00:00:00Z" },
        { currentPrice: 215, priceInOneMonth: 225, dateOfRequest: "2023-05-25T00:00:00Z" },
        { currentPrice: 220, priceInOneMonth: 230, dateOfRequest: "2023-05-26T00:00:00Z" },
        { currentPrice: 225, priceInOneMonth: 235, dateOfRequest: "2023-05-27T00:00:00Z" },
        { currentPrice: 230, priceInOneMonth: 240, dateOfRequest: "2023-05-28T00:00:00Z" },
      ],
    },
  ]);

  // Initialize colors array with unique colors for each series
  const initialColors = [
    "#F44336", "#E91E63", "#9C27B0", "#3F51B5", "#2196F3", "#FF9800", "#4CAF50", "#FFC107"
  ]

  const [colors, setColors] = useState<string[]>(initialColors);

  const handleColorChange = (selectedValue: string, index: number) => {
    const newColors = [...colors];
    newColors[index] = selectedValue;
    setColors(newColors);
  };

  const seriesData: ApexOptions["series"] = hotelData.flatMap((hotel, hotelIndex) => [
    {
      name: `Current Price (${hotel.hotel})`,
      data: hotel.prices.map(price => price.currentPrice),
    },
    {
      name: `Price in One Month (${hotel.hotel})`,
      data: hotel.prices.map(price => price.priceInOneMonth),
    }
  ]);

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

  const dropdowns: JSX.Element[] = hotelData.flatMap((hotel, hotelIndex) => [
    <Dropdown
      key={`${hotel._id}-current`}
      initialValue={colors[hotelIndex * 2]}
      options={dropdownOptions}
      onChange={(selectedValue) => handleColorChange(selectedValue, hotelIndex * 2)}
    />,
    <Dropdown
      key={`${hotel._id}-oneMonth`}
      initialValue={colors[hotelIndex * 2 + 1]}
      options={dropdownOptions}
      onChange={(selectedValue) => handleColorChange(selectedValue, hotelIndex * 2 + 1)}
    />
  ]);

  const dates: string[] = hotelData.length > 0 ? hotelData[0].prices.map(price => new Date(price.dateOfRequest).toLocaleDateString()) : [];

  // ApexCharts options
  const options: ApexOptions = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: dates,
    },
    yaxis: {
      min: 0,
    },
    colors: colors,
  };

  return (
    <div>
      <div className="dropdowns">
        {dropdowns}
      </div>
      <div className="chart" id="chart">
        <ReactApexChart options={options} series={seriesData} height="350" />
      </div>
    </div>
  );
};

export default ChartTest;