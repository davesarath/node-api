const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// **Create a new product**
exports.create = (req, res) => {
  const { code, name, description, category_id } = req.body;

  const query = `INSERT INTO products (code, name, description, category_id) VALUES (?, ?, ?, ?)`;
  db.run(query, [code, name, description, category_id], function (err) {
    if (err) return res.status(400).json({ message: 'Error creating product' });
    res.status(201).json({ id: this.lastID, code, name, description, category_id });
  });
};

// **Get all products**
exports.getAll = (req, res) => {
  const query = `SELECT * FROM products`;
  db.all(query, [], (err, products) => {
    if (err) return res.status(500).json({ message: 'Error fetching products' });
    res.status(200).json(products);
  });
};

// **Get a product by id**
exports.getById = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM products WHERE id = ?`;
  db.get(query, [id], (err, product) => {
    if (err || !product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  });
};
