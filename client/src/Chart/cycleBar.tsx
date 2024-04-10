import React from 'react';
import { Bar } from 'react-chartjs-2';
import { convertToTimeUnits } from '../Utils/cycleUtils';

const CycleBar = ({chartData}) => {
  const options = {
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
    plugins: {
      legend: {
        display: false
      },
    },
  };
  const getChartData = (cycleData) => {
    const data = Object.values(cycleData.cycleDataList).map((item) => convertToTimeUnits(item));
    const hours = data.map((item) => item.hours);
    return {
      labels: Object.keys(cycleData.cycleDataList),
      datasets: [
        {
          label: 'hours',
          data: hours,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }
      ],
    };
  }

  return (
    <React.Fragment>
      {chartData ? (
        <Bar data={getChartData(chartData)} options={options} />
      ) : (
        <div>No chart data to display</div>
      )}
    </React.Fragment>
  );
}

export { CycleBar };
