const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const incidentRoutes = require('./routes/incidents');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/incidents', incidentRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
