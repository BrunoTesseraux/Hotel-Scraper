import React, { useState } from "react";
import "./ChartTest.scss";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useHotelContext } from "../../context/HotelPricescontext";

const ChartTest: React.FC = () => {
  const { hotelData } = useHotelContext(); // Nutzung des Contexts

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

  const seriesData: ApexOptions["series"] = hotelData.flatMap((hotel) => [
    {
      name: `Current Price (${hotel.hotel})`,
      data: hotel.prices.map(price => price.currentPrice),
    },
    {
      name: `Price in One Month (${hotel.hotel})`,
      data: hotel.prices.map(price => price.priceInOneMonth),
    }
  ]);

  const dates: string[] = hotelData.length > 0 ? hotelData[0].prices.map(price => new Date(price.dateOfRequest).toLocaleDateString()) : [];

  // ApexCharts options
  const options: ApexOptions = {
    chart: {
      type: 'line',
      fontFamily: "roboto-regular",
    },
    xaxis: {
      categories: dates,
    },
    yaxis: {
      min: 0,
    },
    //Die farben müssen noch aus dem User Kontext gezogen werden und dann mit den hotelnamen im chart abgeglichen
    //werden. dann chartfarben auf diese farben setzen 
    colors: colors,
  };
  console.log(seriesData);
  

  return (
    <div className="chart-container">
      <div className="chart" id="chart">
        <ReactApexChart options={options} series={seriesData} height="350" />
      </div>
    </div>
  );
};

export default ChartTest;