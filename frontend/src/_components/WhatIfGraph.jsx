"use client";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function WhatIfGraph({ graphData }) {
  const [hourlyData, setHourlyData] = useState();
  const [dailyData, setDailyData] = useState();

  useEffect(() => {
    if (graphData && graphData.graphData) {
      const formatData = (data) => {
        return data.map((entry) => {
          const [timestamp, sale_price_usd] = Object.entries(entry)[0]; // Extract key-value pair
          return { timestamp, sale_price_usd };
        });
      };
  
      setHourlyData(formatData(graphData.graphData.predicted_prices_hours));
      setDailyData(formatData(graphData.graphData.predicted_prices_days));
    }
  }, [graphData]);
  
  console.log(hourlyData);
  console.log(dailyData);

  const updateDailyPrice = (index, value) => {
    setDailyData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, sale_price_usd: parseFloat(value) || 0 } : item
      )
    );
  };

  return (
    <div className="carousel carousel-vertical rounded-box h-40 mx-8">
      <h2>Hourly Predictions</h2>
      <LineChart width={400} height={200} data={hourlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" tick={{ fill: "white" }} tickFormatter={(val) => val.slice(5, 10)} />
        <YAxis tick={{ fill: "white" }} domain={[1000, "dataMax"]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sale_price_usd" stroke="#8884d8" strokeWidth={2} />
      </LineChart>

      <h2>Daily Predictions</h2>
      <LineChart width={400} height={200} data={dailyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" tick={{ fill: "white" }} tickFormatter={(val) => val.slice(5, 10)} />
        <YAxis tick={{ fill: "white" }} domain={[1000, "dataMax"]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sale_price_usd" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </div>
  );
}
