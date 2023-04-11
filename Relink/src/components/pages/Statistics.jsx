import React, { useState, useRef, useEffect } from "react";
import Homeheader from "../headers/Homeheader";
import Label from "../materials/Label";
import { useLoaderData } from "react-router-dom";
import * as d3 from "d3";

export default function Statistics() {
  const userData = useLoaderData();
  const svgRef1 = useRef(null);
  const svgRef2 = useRef(null);
  const words = userData.words[0].wordList;
  const materials = userData.materials;
  console.log(words, materials);
  const [data, setData] = useState({});

  const createSVGChart = (data, svgEl, type) => {
    //Sorting by Date
    const formattedDates = d3.rollup(
      data,
      (v) => v.length,
      (d) => d3.timeDay.floor(new Date(d.createdAt))
    );
    const sortedData = Array.from(formattedDates, ([key, value]) => ({
      date: key,
      value,
    })).sort((a, b) => a.date - b.date);

    //finding accumlative sum for each data point
    let accumulativeSum = 0;
    const formattedData = sortedData.map((d) => {
      const dateFormatter = d3.timeFormat("%Y-%m-%d");
      d.date = dateFormatter(d.date);
      accumulativeSum += d.value;
      return { date: d.date, value: accumulativeSum };
    });
    setData(formattedData);

    //setting up svg
    const w = 1000;
    const h = 300;
    const svg = d3
      .select(svgEl.current)
      .attr("width", w)
      .attr("height", h)
      .style("background", "#010101")
      .style("overflow", "visible");

    //setup scaling
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(formattedData, (d) => new Date(d.date)))
      .range([0, w]);
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(formattedData, (d) => d.value))
      .range([h, 0]);

    const generateScaledLine = d3
      .line()
      .x((d) => xScale(new Date(d.date)))
      .y((d) => yScale(d.value))
      .curve(d3.curveCardinal);

    //set axis
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
    svg.append("g").call(yAxis);

    // setting up the data for the svg
    svg
      .selectAll(".line")
      .data([formattedData])
      .join("path")
      .attr("d", (d) => generateScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    svg
      .selectAll("circle")
      .data(formattedData)
      .join("circle")
      .attr("cx", (d) => xScale(new Date(d.date)))
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 5)
      .attr("fill", "#d3d3d3")
      .append("title")
      .text((d) => `${type}: ${d.value}\nDate: ${d.date}`);
  };

  useEffect(() => {
    createSVGChart(words, svgRef1, "Words");
    createSVGChart(materials, svgRef2, "Materials");
  }, []);

  return (
    <main className="main-content">
      <Homeheader headerTitle="Statistics" />
      <Label name="Known Words" />
      <div className="list" style={{ padding: "3rem" }}>
        <svg ref={svgRef1}></svg>
      </div>
      <Label name="Materials" />
      <div className="list">
        <svg ref={svgRef2}></svg>
      </div>
    </main>
  );
}
