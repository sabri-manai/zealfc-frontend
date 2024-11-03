import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import './LineChart.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const LineChart = ({ dataPoints, dates, title }) => {
  // Custom plugin to draw horizontal and vertical lines with x, y values
  const crosshairPlugin = {
    id: 'crosshairPlugin',
    afterEvent: function (chart, args) {
      const event = args.event;

      if (event.type === 'mousemove') {
        // Use Chart.js method to get the nearest data point
        const points = chart.getElementsAtEventForMode(
          event.native,
          'nearest',
          { intersect: false },
          true
        );

        if (points.length) {
          const firstPoint = points[0];
          const datasetIndex = firstPoint.datasetIndex;
          const dataIndex = firstPoint.index;

          const x = chart.scales.x.getPixelForValue(dataIndex);
          const yValue = chart.data.datasets[datasetIndex].data[dataIndex];
          const y = chart.scales.y.getPixelForValue(yValue);

          chart.crosshair = {
            x,
            y,
            xValue: chart.data.labels[dataIndex],      // Date
            yValue: yValue,                            // Data point
          };
        } else {
          chart.crosshair = null;
        }
      } else if (event.type === 'mouseout') {
        chart.crosshair = null;
      }
    },
    afterDraw: function (chart) {
      if (chart.crosshair) {
        const { x, y, xValue, yValue } = chart.crosshair;
        const {
          ctx,
          chartArea: { left, right, top, bottom },
        } = chart;

        ctx.save();
        ctx.beginPath();

        // Draw vertical line from intersection point downwards
        ctx.moveTo(x, y);
        ctx.lineTo(x, bottom);

        // Draw horizontal line from intersection point leftwards
        ctx.moveTo(x, y);
        ctx.lineTo(left, y);

        ctx.strokeStyle = 'rgba(30, 182, 45, 1)';
        ctx.stroke();

        ctx.fillStyle = '#1EB62D';
        ctx.font = '14px Nyxerin';

        // X Value Label (Date) near the x-axis (bottom)
        ctx.textAlign = 'center';
        let xLabelX = x;
        let xLabelY = bottom + 15; // Slightly above the bottom edge
        if (xLabelY > bottom + 15) {
          xLabelY = bottom + 15; // Prevent from going below the chart
        }
        ctx.fillText(xValue, xLabelX, xLabelY);

        // Y Value Label (Data Point) near the y-axis (left side)
        ctx.textAlign = 'right'; // Align text to the right of the specified x position
        let yLabelX = left - 5; // Move the label left of the vertical line
        let yLabelY = y + 3;    // Center the label vertically with a slight offset
        if (yLabelY < top + 12) {
          yLabelY = top + 12;   // Prevent the label from going above the chart
        }
        ctx.fillText(yValue.toFixed(2), yLabelX, yLabelY);

        ctx.restore();
      }
    },
  };

  const data = {
    labels: dates, // Dates on the x-axis
    datasets: [
      {
        label: title,
        data: dataPoints, // Data points on the y-axis
        borderColor: '#1EB62D',
        backgroundColor: 'transparent',
        borderWidth: 3,
        pointRadius: 0, // Hide points
        pointHoverRadius: 0, // Disable hover effect on points
        pointBackgroundColor: '#1EB62D',
        tension: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important for responsiveness
    layout: {
      padding: {
        left: 100,
        right: 100,
        top: 30,
        bottom: 30,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false, // Disable the tooltip
      },
    },
    scales: {
      x: {
        display: false,
        type: 'category',
        labels: dates,
      },
      y: {
        beginAtZero: true,
        display: false,
      },
    },
  };

  return (
    <div className="progress-chart-container">
      <div className="chart-title">{title}</div>
      <Line data={data} options={options} plugins={[crosshairPlugin]} />
    </div>
  );
};

export default LineChart;
