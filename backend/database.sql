CREATE DATABASE IF NOT EXISTS portfolio;
USE portfolio;

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
);