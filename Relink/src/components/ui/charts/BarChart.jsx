import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Links Created",
    },
  },
};

export default function BarChart(chartData) {
  //Destructure chartData prop
  const {
    chartData: {
      words: { value: wordsVal },
      materials: { value: materialsVal },
    },
  } = chartData;
  const barChartData = [wordsVal.length, materialsVal.length];
  const data = {
    labels: ["Words", "Materials"],
    datasets: [
      {
        label: "Saved",
        data: barChartData.map((dataPoint) => dataPoint),
        backgroundColor: "rgba(171, 0, 0, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
