import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Emptylist from "../Emptylist";
import List from "../../materials/List";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Material Types",
    },
  },
};

export default function PieChart(chartData) {
  const {
    chartData: {
      materials: { value },
    },
  } = chartData;

  const materialTypes = value.map((mat) => mat.type);

  const calcTypeCounts = () => {
    const materialTypeCounts = {};

    materialTypes.forEach((type) => {
      if (!materialTypeCounts[type]) {
        materialTypeCounts[type] = 1;
      } else {
        materialTypeCounts[type] += 1;
      }
    });

    return {
      values: Object.values(materialTypeCounts),
      keys: Object.keys(materialTypeCounts),
    };
  };
  const data = {
    labels: calcTypeCounts(value).keys,
    datasets: [
      {
        label: "# of Materials",
        data: calcTypeCounts(value).values,
        backgroundColor: ["rgba(171, 0, 0, 0.5)", "rgba(86, 142, 192, 0.5)"],
        borderColor: ["rgb(255, 16, 0, 0.5)", "rgba(86, 142, 192, 0.75)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {value.length > 0 ? (
        <Pie options={options} data={data} />
      ) : (
        <List>
          <Emptylist type="materials" listType="Reading List" />
        </List>
      )}
    </>
  );
}
