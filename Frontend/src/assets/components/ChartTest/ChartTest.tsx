import { useEffect, useState } from "react";
import "./ChartTest.scss";
import { HotelData } from "../../../types";
import ReactApexChart from "react-apexcharts";

const ChartTest: React.FC = () => {
  const [hotelData, setHotelData] = useState<HotelData[]>([
    {
      "_id": "60f8d5a2c2b5b814c8b7b44b",
      "hotel": "Lakeside Lodge",
      "breakfastIncluded": true,
      "stars": 4,
      "prices": [
        {
          "currentPrice": 120,
          "priceInOneMonth": 130,
          "dateOfRequest": "2023-05-22T00:00:00Z"
        },
        {
          "currentPrice": 125,
          "priceInOneMonth": 135,
          "dateOfRequest": "2023-05-23T00:00:00Z"
        },
        {
          "currentPrice": 130,
          "priceInOneMonth": 140,
          "dateOfRequest": "2023-05-24T00:00:00Z"
        },
        {
          "currentPrice": 128,
          "priceInOneMonth": 138,
          "dateOfRequest": "2023-05-25T00:00:00Z"
        },
        {
          "currentPrice": 132,
          "priceInOneMonth": 142,
          "dateOfRequest": "2023-05-26T00:00:00Z"
        },
        {
          "currentPrice": 135,
          "priceInOneMonth": 145,
          "dateOfRequest": "2023-05-27T00:00:00Z"
        },
        {
          "currentPrice": 140,
          "priceInOneMonth": 150,
          "dateOfRequest": "2023-05-28T00:00:00Z"
        }
      ]
    },
    {
      "_id": "60f8d5a2c2b5b814c8b7b44c",
      "hotel": "Mountain Retreat",
      "breakfastIncluded": false,
      "stars": 5,
      "prices": [
        {
          "currentPrice": 200,
          "priceInOneMonth": 210,
          "dateOfRequest": "2023-05-22T00:00:00Z"
        },
        {
          "currentPrice": 205,
          "priceInOneMonth": 215,
          "dateOfRequest": "2023-05-23T00:00:00Z"
        },
        {
          "currentPrice": 210,
          "priceInOneMonth": 220,
          "dateOfRequest": "2023-05-24T00:00:00Z"
        },
        {
          "currentPrice": 215,
          "priceInOneMonth": 225,
          "dateOfRequest": "2023-05-25T00:00:00Z"
        },
        {
          "currentPrice": 220,
          "priceInOneMonth": 230,
          "dateOfRequest": "2023-05-26T00:00:00Z"
        },
        {
          "currentPrice": 225,
          "priceInOneMonth": 235,
          "dateOfRequest": "2023-05-27T00:00:00Z"
        },
        {
          "currentPrice": 230,
          "priceInOneMonth": 240,
          "dateOfRequest": "2023-05-28T00:00:00Z"
        }
      ]
    }
  ]);

  const [colors, setColors] = useState(['#F44336', '#E91E63', '#9C27B0', '#3F51B5']);

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newColors = [...colors];
    newColors[index] = e.target.value;
    setColors(newColors);
  };

  const currentPricesLakeside = hotelData[0].prices.map(price => price.currentPrice);
  const pricesInOneMonthLakeside = hotelData[0].prices.map(price => price.priceInOneMonth);
  const datesLakeside = hotelData[0].prices.map(price => new Date(price.dateOfRequest).toLocaleDateString());

  const currentPricesMountain = hotelData[1].prices.map(price => price.currentPrice);
  const pricesInOneMonthMountain = hotelData[1].prices.map(price => price.priceInOneMonth);
  const datesMountain = hotelData[1].prices.map(price => new Date(price.dateOfRequest).toLocaleDateString());

  const options = {
    chart: {
      type: 'line'
    },
    series: [
      {
        name: 'Current Price (Lakeside Lodge)',
        data: currentPricesLakeside
      },
      {
        name: 'Price in One Month (Lakeside Lodge)',
        data: pricesInOneMonthLakeside
      },
      {
        name: 'Current Price (Mountain Retreat)',
        data: currentPricesMountain
      },
      {
        name: 'Price in One Month (Mountain Retreat)',
        data: pricesInOneMonthMountain
      }
    ],
    xaxis: {
      categories: datesLakeside
    },
    yaxis: {
      min: 0
    },
    colors: colors
  };

  return (
    <div>
      <div className="dropdowns">
        <div>
          <label htmlFor="currentPriceLakesideColor">Current Price (Lakeside Lodge) Color:</label>
          <select id="currentPriceLakesideColor" value={colors[0]} onChange={(e) => handleColorChange(e, 0)}>
            <option value="#F44336">Red</option>
            <option value="#E91E63">Pink</option>
            <option value="#9C27B0">Purple</option>
            <option value="#3F51B5">Indigo</option>
            <option value="#2196F3">Blue</option>
          </select>
        </div>
        <div>
          <label htmlFor="priceInOneMonthLakesideColor">Price in One Month (Lakeside Lodge) Color:</label>
          <select id="priceInOneMonthLakesideColor" value={colors[1]} onChange={(e) => handleColorChange(e, 1)}>
            <option value="#F44336">Red</option>
            <option value="#E91E63">Pink</option>
            <option value="#9C27B0">Purple</option>
            <option value="#3F51B5">Indigo</option>
            <option value="#2196F3">Blue</option>
          </select>
        </div>
        <div>
          <label htmlFor="currentPriceMountainColor">Current Price (Mountain Retreat) Color:</label>
          <select id="currentPriceMountainColor" value={colors[2]} onChange={(e) => handleColorChange(e, 2)}>
            <option value="#F44336">Red</option>
            <option value="#E91E63">Pink</option>
            <option value="#9C27B0">Purple</option>
            <option value="#3F51B5">Indigo</option>
            <option value="#2196F3">Blue</option>
          </select>
        </div>
        <div>
          <label htmlFor="priceInOneMonthMountainColor">Price in One Month (Mountain Retreat) Color:</label>
          <select id="priceInOneMonthMountainColor" value={colors[3]} onChange={(e) => handleColorChange(e, 3)}>
            <option value="#F44336">Red</option>
            <option value="#E91E63">Pink</option>
            <option value="#9C27B0">Purple</option>
            <option value="#3F51B5">Indigo</option>
            <option value="#2196F3">Blue</option>
          </select>
        </div>
      </div>
      <div className="chart" id="chart">
        <ReactApexChart options={options} series={options.series} height="350" />
      </div>
    </div>
  );
};

export default ChartTest;