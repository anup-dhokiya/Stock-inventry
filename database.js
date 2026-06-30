const Database = require('better-sqlite3');
const db = new Database('pocketworld.db');

// Create Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    sku TEXT UNIQUE,
    category TEXT,
    stock INTEGER DEFAULT 0,
    max_stock INTEGER DEFAULT 100,
    location TEXT,
    status TEXT DEFAULT 'in-stock'
  );

  CREATE TABLE IF NOT EXISTS deliveries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT,
    supplier TEXT,
    quantity INTEGER,
    delivery_date TEXT,
    status TEXT DEFAULT 'Pending'
  );
`);

module.exports = db;
