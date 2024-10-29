import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';
import './LineChart.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const LineChart = ({ dataPoints, dates, title }) => {
  const data = {
    labels: dates, // X-axis labels (Dates)
    datasets: [
      {
        label: title,
        data: dataPoints,
        borderColor: '#1EB62D',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 5, // Dot size on each point
        pointHoverRadius: 7,
        lineTension: 0.3, // Smooth lines
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false, // Hide X-axis grid lines and labels
      },
      y: {
        beginAtZero: true,
        display: false, // Hide Y-axis grid lines and labels
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Disable default tooltip
        external: function(context) {
          // Tooltip element
          let tooltipEl = document.getElementById('custom-tooltip');
          if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'custom-tooltip';
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.pointerEvents = 'none';
            tooltipEl.style.background = '#0a0a0a';
            tooltipEl.style.color = '#1EB62D';
            tooltipEl.style.border = '1px solid #1EB62D';
            tooltipEl.style.padding = '8px';
            tooltipEl.style.borderRadius = '4px';
            tooltipEl.style.opacity = 0;
            document.body.appendChild(tooltipEl);
          }

          // Hide if no tooltip
          const tooltipModel = context.tooltip;
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }

          // Set tooltip text
          if (tooltipModel.body) {
            const points = tooltipModel.dataPoints[0].raw;
            const date = tooltipModel.dataPoints[0].label;

            tooltipEl.innerHTML = `
              <div style="text-align: left;">
                <div style="font-size: 14px;">${points} POINTS</div>
                <div style="font-size: 12px;">${date}</div>
              </div>
            `;
          }

          // Position tooltip
          const position = context.chart.canvas.getBoundingClientRect();
          tooltipEl.style.opacity = 1;
          tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
          tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - 40 + 'px';
        },
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
