const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});



// Import and use person routes
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);






app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
