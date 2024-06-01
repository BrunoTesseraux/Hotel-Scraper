import { useEffect, useState } from "react";
import "./ChartTest.scss";
import { HotelData } from "../../../types";
import ApexCharts from 'apexcharts';

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
    }
  ]);

  useEffect(() => {
    const currentPrices = hotelData[0].prices.map(price => price.currentPrice);
    const pricesInOneMonth = hotelData[0].prices.map(price => price.priceInOneMonth);
    const dates = hotelData[0].prices.map(price => new Date(price.dateOfRequest).toLocaleDateString());

    const options = {
      chart: {
        type: 'line'
      },
      series: [
        {
          name: 'Current Price',
          data: currentPrices
        },
        {
          name: 'Price in One Month',
          data: pricesInOneMonth
        }
      ],
      xaxis: {
        categories: dates
      }
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render().catch((err) => {
      console.error('Error rendering chart:', err);
    });

    return () => {
      chart.destroy();
    };
  }, [hotelData]);

  return (
    <div className="chart" id="chart"></div>
  );
};

export default ChartTest;