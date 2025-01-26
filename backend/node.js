const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logs requests to the console

// In-memory storage
let dataStore = [];

// POST endpoint to save data
app.post('/api/save', (req, res) => {
  const { address } = req.body;
  if (!address || typeof address !== 'string') {
    return res.status(400).json({ error: 'A valid address is required.' });
  }

  const newData = { id: dataStore.length + 1, address };
  dataStore.push(newData);

  res.status(201).json({ message: 'Data saved successfully.', data: newData });
});

// GET endpoint to retrieve data
app.get('/api/data', (req, res) => {
  res.json(dataStore);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

// Start server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
