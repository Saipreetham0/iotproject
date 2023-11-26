import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const LineChart = ({ title, sensorData, lineColor }) => {
  const reversedData = sensorData.slice().reverse();

  const data = {
    labels: reversedData.map((dataPoint) => dataPoint.timestamp),
    datasets: [
      {
        label: title,
        backgroundColor: lineColor,
        borderColor: lineColor,
        data: reversedData.map((dataPoint) => dataPoint.data),
        fill: false,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: false, // Set responsive to false
    scales: {
      x: [
        {
          type: "category",
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
        },
      ],
      y: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    // Set height and width
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    layout: {
      padding: {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30,
      },
    },
  };

  return <Line data={data} options={options} height={350} width={450} />;
};

export default LineChart;
