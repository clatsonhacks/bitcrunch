const express = require("express");

const app = express();
let dataStore = [];

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.post('/api/save', (req, res) => {
  const { address } = req.body;
  if (!address || typeof address !== 'string') {
    return res.status(400).json({ error: 'A valid address is required.' });
  }

  const newData = { id: dataStore.length + 1, address };
  dataStore.push(newData);

  res.status(201).json({ message: 'Data saved successfully.', data: newData });
});

let hourlyData = [];
let dailyData = [];

// POST endpoint for saving hourly data
app.post("/api/save-hourly-data", (req, res) => {
  hourlyData = req.body;
  console.log("Hourly data saved:", hourlyData);
  res.status(200).send({ message: "Hourly data saved successfully!" });
});

// POST endpoint for saving daily data
app.post("/api/save-daily-data", (req, res) => {
  dailyData = req.body;
  console.log("Daily data saved:", dailyData);
  res.status(200).send({ message: "Daily data saved successfully!" });
});

app.get("/api/data", (req, res) => {
  res.json(dataStore);
});

app.get("/api/metadata",(res,req)=>{
  res.json(hourlyData);
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => console.log("Server running on port 3000"));
}

module.exports = app;
