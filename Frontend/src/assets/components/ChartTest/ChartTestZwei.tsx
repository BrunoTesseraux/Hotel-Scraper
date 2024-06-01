import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ChartWithDropdown: React.FC = () => {
  // Initialisiere den Zustand der Farben
  const [colors, setColors] = useState<string[]>(['#3F51B5', '#9C27B0', '#E91E63', '#F44336', '#2196F3']);

  // Funktion zum Ändern der Farben
  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    setColors(prevColors => {
      const newColors = [...prevColors];
      newColors[index] = e.target.value;
      return newColors;
    });
  };

  // Dummy-Daten für die Preise, bitte durch echte Daten ersetzen
  const prices = {
    coinlambosLodge: [100, 200, 300, 400, 500],
    priceIn30DaysCoinlambosLodge: [150, 250, 350, 450, 550],
  };

 // Options for the chart
  const options: Highcharts.Options = {
    chart: { type: 'line' },
    title: { text: 'Correct Price Coinlambos Lodge' },
    series: [{
      name: 'Coinlambos Lodge',
      type: 'line',
      data: prices.coinlambosLodge
    }, {
      name: 'Price in 30 Days Coinlambos Lodge',
      type: 'line',
      data: prices.priceIn30DaysCoinlambosLodge
    }],
    colors: colors
  };

  return (
    <div>
      <div className="dropdown">
        {colors.map((color, index) => (
          <select
            key={index}
            value={color}
            onChange={(e) => handleColorChange(e, index)}
            style={{ backgroundColor: color }}
          >
            <option value="#3F51B5">Indigo</option>
            <option value="#9C27B0">Purple</option>
            <option value="#E91E63">Pink</option>
            <option value="#F44336">Red</option>
            <option value="#2196F3">Blue</option>
          </select>
        ))}
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ChartWithDropdown;