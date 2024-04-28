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
import List from "../../materials/List";
import Emptylist from "../Emptylist";

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
      text: "Items Saved",
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

  console.log(wordsVal.length);

  return (
    <>
      {wordsVal.length > 0 || materialsVal.length > 0 ? (
        <Bar options={options} data={data} />
      ) : (
        <List>
          <Emptylist type="words" listType="Word List" />
        </List>
      )}
    </>
  );
}
