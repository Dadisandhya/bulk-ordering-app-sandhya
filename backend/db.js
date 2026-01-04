const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.log("Error opening database", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL
  )
`);


db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    buyer_name TEXT NOT NULL,
    address TEXT NOT NULL,
    status TEXT DEFAULT 'Pending'
  )
`);

module.exports = db;

db.run(`
  INSERT OR IGNORE INTO products (id, name, price) VALUES
  (1, 'Tomato', 30),
  (2, 'Potato', 25),
  (3, 'Onion', 40),
  (4, 'Apple', 120),
  (5, 'Banana', 50)
`);
