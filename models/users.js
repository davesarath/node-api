const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const JWT_SECRET = 'your_jwt_secret_key';

// **User Registration**
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Error hashing password' });

    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.run(query, [name, email, hashedPassword], function (err) {
      if (err) return res.status(400).json({ message: 'Email already exists' });
      res.status(201).json({ id: this.lastID, name, email });
    });
  });
};

// **User Login**
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ?`;
  
  db.get(query, [email], (err, user) => {

    if (err || !user) return res.status(400).json({ message: 'Invalid email or password' });
    
    bcrypt.compare(password, user.password, (err, match) => {
      if (err || !match) return res.status(400).json({ message: 'Invalid email or password' });

      // Generate a JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    });
  });
};
