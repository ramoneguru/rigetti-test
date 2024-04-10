import React from 'react';
import { Pie } from 'react-chartjs-2';

const CyclePie = ({chartData}) => {
  const getChartData = (cycleData) => {
    const data = Object.values(cycleData.cyclePercentageList);
    const labels = Object.keys(cycleData.cyclePercentageList);
    return {
      labels,
      datasets: [
        {
          label: '%',
          data,
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
        },
      ],
    };
  }

  return (
    <React.Fragment>
      {chartData ? (
        <Pie data={getChartData(chartData)} />
      ) : (
        <div>No chart data to display</div>
      )}
    </React.Fragment>
  );
}

export { CyclePie }