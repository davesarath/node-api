const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// **Create a new category**
exports.create = (req, res) => {
  const { code, name, description } = req.body;

  const query = `INSERT INTO categories (code, name, description) VALUES (?, ?, ?)`;
  db.run(query, [code, name, description], function (err) {
    if (err) return res.status(400).json({ message: 'Error creating category' });
    res.status(201).json({ id: this.lastID, code, name, description });
  });
};

// **Get all categories**
exports.getAll = (req, res) => {
  const query = `SELECT * FROM categories`;
  db.all(query, [], (err, categories) => {
    if (err) return res.status(500).json({ message: 'Error fetching categories' });
    res.status(200).json(categories);
  });
};

// **Get a category by id**
exports.getById = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM categories WHERE id = ?`;
  db.get(query, [id], (err, category) => {
    if (err || !category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  });
};
