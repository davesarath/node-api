const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const users = require('./models/users');
const categories = require('./models/categories');
const products = require('./models/products');

const app = express();
const db = new sqlite3.Database('./database.db');
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your_jwt_secret_key';

app.use(bodyParser.json());

// **Helper function to validate JWT token**
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Access denied. Token is required.' });

  // Verify JWT token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' });
    req.user = user; // Attach the user info to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

// **Database Schema Setup (Create Tables if Not Exists)**
const initializeDatabase = () => {
  // Create users table
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;
  
  // Create categories table
  const createCategoriesTableQuery = `
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL
    );
  `;

  // Create products table
  const createProductsTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      category_id INTEGER,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );
  `;

  // Run the queries to create tables
  db.serialize(() => {
    db.run(createUsersTableQuery);
    db.run(createCategoriesTableQuery);
    db.run(createProductsTableQuery);
  });
};

// Call the database initialization function on app start
initializeDatabase();

// **User Registration API**
app.post('/api/register', users.register);

// **User Login API** - Return JWT Token on success
app.post('/api/login', users.login);

// **Categories CRUD API** (Authenticated routes)
app.post('/api/categories', authenticateToken, categories.create);
app.get('/api/categories', authenticateToken, categories.getAll);
app.get('/api/categories/:id', authenticateToken, categories.getById);

// **Products CRUD API** (Authenticated routes)
app.post('/api/products', authenticateToken, products.create);
app.get('/api/products', authenticateToken, products.getAll);
app.get('/api/products/:id', authenticateToken, products.getById);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
