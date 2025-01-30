"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const initialHourlyData = [
  { timestamp: "2024-01-30 10:45:00", sale_price_usd: 1650.56 },
  { timestamp: "2024-01-30 11:45:00", sale_price_usd: 1650.56 },
  { timestamp: "2024-01-30 12:45:00", sale_price_usd: 1650.56 },
  { timestamp: "2024-01-30 13:45:00", sale_price_usd: 1650.56 },
  { timestamp: "2024-01-30 14:45:00", sale_price_usd: 1846.63 },
  { timestamp: "2024-01-30 15:45:00", sale_price_usd: 1885.74 },
  { timestamp: "2024-01-30 16:45:00", sale_price_usd: 1885.74 },
  { timestamp: "2024-01-30 17:45:00", sale_price_usd: 1885.74 },
  { timestamp: "2024-01-30 18:45:00", sale_price_usd: 1747.47 },
  { timestamp: "2024-01-30 19:45:00", sale_price_usd: 1721.54 },
  { timestamp: "2024-01-30 20:45:00", sale_price_usd: 1721.54 }
];

const initialDailyData = [
  { timestamp: "2024-01-25 15:45:00", sale_price_usd: 1901.38 },
  { timestamp: "2024-01-26 15:45:00", sale_price_usd: 1901.38 },
  { timestamp: "2024-01-27 15:45:00", sale_price_usd: 1901.38 },
  { timestamp: "2024-01-28 15:45:00", sale_price_usd: 1901.38 },
  { timestamp: "2024-01-29 15:45:00", sale_price_usd: 1885.74 },
  { timestamp: "2024-01-31 15:45:00", sale_price_usd: 1885.74 },
  { timestamp: "2024-02-01 15:45:00", sale_price_usd: 1901.38 },
  { timestamp: "2024-02-02 15:45:00", sale_price_usd: 1901.38 },
  { timestamp: "2024-02-03 15:45:00", sale_price_usd: 1901.38 },
  { timestamp: "2024-02-04 15:45:00", sale_price_usd: 1901.38 }
];

export default function LineGraphs() {
  const [hourlyData, setHourlyData] = useState(initialHourlyData);
  const [dailyData, setDailyData] = useState(initialDailyData);

  const updateHourlyPrice = (index, value) => {
    const newData = [...hourlyData];
    newData[index].sale_price_usd = parseFloat(value) || 0;
    setHourlyData(newData);
  };

  const updateDailyPrice = (index, value) => {
    const newData = [...dailyData];
    newData[index].sale_price_usd = parseFloat(value) || 0;
    setDailyData(newData);
  };

  return (
    <div style={{ backgroundColor: "#000", padding: "20px", borderRadius: "10px", color: "white" }}>
      <h2>Hourly Predictions</h2>
      {hourlyData.map((entry, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <span>{entry.timestamp}</span>
          <input
            type="number"
            value={entry.sale_price_usd}
            onChange={(e) => updateHourlyPrice(index, e.target.value)}
            style={{
              backgroundColor: "#222",
              color: "#fff",
              border: "1px solid #444",
              padding: "5px",
              borderRadius: "5px",
              marginLeft: "10px"
            }}
          />
        </div>
      ))}
      <LineChart width={800} height={400} data={hourlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" tick={{ fill: "white" }} tickFormatter={(val) => val.slice(5, 10)} />
        <YAxis tick={{ fill: "white" }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sale_price_usd" stroke="#8884d8" strokeWidth={2} />
      </LineChart>

      <h2>Daily Predictions</h2>
      {dailyData.map((entry, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <span>{entry.timestamp}</span>
          <input
            type="number"
            value={entry.sale_price_usd}
            onChange={(e) => updateDailyPrice(index, e.target.value)}
            style={{
              backgroundColor: "#222",
              color: "#fff",
              border: "1px solid #444",
              padding: "5px",
              borderRadius: "5px",
              marginLeft: "10px"
            }}
          />
        </div>
      ))}
      <LineChart width={800} height={400} data={dailyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" tick={{ fill: "white" }} tickFormatter={(val) => val.slice(5, 10)} />
        <YAxis tick={{ fill: "white" }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sale_price_usd" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </div>
  );
}
