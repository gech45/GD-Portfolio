const mysql = require('mysql2/promise');

const databaseName = process.env.DB_NAME;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: databaseName,
  waitForConnections: true,
  connectionLimit: 10,
});

async function initializeDatabase() {
  const serverConnection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await serverConnection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
  await serverConnection.end();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id VARCHAR(36) PRIMARY KEY,
      project_number VARCHAR(20) NOT NULL,
      name VARCHAR(150) NOT NULL,
      type VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      color VARCHAR(30) NOT NULL DEFAULT 'blue',
      image TEXT,
      app_link TEXT,
      github_link TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

module.exports = { pool, initializeDatabase };