require('dotenv').config();

const app = require('./app');
const { initializeDatabase } = require('./db');

const port = process.env.PORT || 5000;

initializeDatabase()
  .then(() => app.listen(port, () => {
    console.log(`API server running on ${port}`);
  }))
  .catch((error) => {
    console.error('Could not connect to MySQL:', error.message);
    process.exit(1);
  });