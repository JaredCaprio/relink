import React from "react";
import Homeheader from "../headers/Homeheader";
import BarChart from "../ui/charts/BarChart";
import PieChart from "../ui/charts/PieChart";
import { useLoaderData } from "react-router-dom";

export default function Statistics() {
  const loadedChartData = useLoaderData();

  return (
    <main className="main-content">
      <Homeheader headerTitle="Statistics" />
      <div class="statistics__main">
        <BarChart chartData={loadedChartData} />
        <PieChart chartData={loadedChartData} />
      </div>
    </main>
  );
}

export const chartDataLoader = async () => {
  try {
    const [words, materials] = await Promise.allSettled([
      fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/words`, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }).then((response) => response.json()),
      fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/materials`, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }).then((response) => response.json()),
    ]);
    return {
      words,
      materials,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error; // Propagate the error for handling elsewhere
  }
};
