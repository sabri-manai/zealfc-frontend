import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';
import './LineChart.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const LineChart = ({ dataPoints, dates, title }) => {
  const data = {
    labels: dates,
    datasets: [
      {
        label: title,
        data: dataPoints,
        borderColor: '#1EB62D',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#1EB62D',
        lineTension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important for responsiveness
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="progress-chart-container">
      <div className="chart-title">{title}</div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
