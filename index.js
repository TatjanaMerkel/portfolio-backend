const cors = require("cors");
const express = require("express");
const mysql = require("mysql");

const server = express();
const port = 3001;

server.use(express.json());
server.use(cors());

//
// Category routes
//

server.get("/categories/", (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "SELECT id, name FROM categories",
    function (error, results, fields) {
      if (error) throw error;

      console.log("The solution is: ", results);

      res.json(results);
    }
  );

  connection.end();
});

server.post("/category/", (req, res) => {
  console.log(req.body);
  const { name } = req.body;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "INSERT INTO categories (name) VALUES (?)",
    [name],
    function (error, results, fields) {
      if (error) throw error;

      console.log("The INSERT result is: ", results);

      res.json({ success: "Category added successfully" });
    }
  );

  connection.end();
});

server.delete("/category/:id", (req, res) => {
  const id = req.params.id;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "DELETE FROM categories WHERE id = ?",
    [id],
    function (error, results, fields) {
      if (error) throw error;

      console.log("The DELETE result is: ", results);

      res.json({ success: "Category deleted successfully" });
    }
  );

  connection.end();
});

server.get("/category/:id", (req, res) => {
  const id = req.params.id;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "SELECT id, name FROM categories WHERE id = ?",
    [id],
    function (error, results, fields) {
      if (error) throw error;

      console.log("The SELECT result is: ", results);

      res.json(results[0]);
    }
  );

  connection.end();
});

server.put("/category/:id", (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "UPDATE categories SET name = ? WHERE id = ?",
    [name, id],
    function (error, results, fields) {
      if (error) throw error;

      console.log("The UPDATE result is: ", results);

      res.json({ success: "Category updated successfully" });
    }
  );

  connection.end();
});

//
// Product routes
//

server.get("/products/", (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "SELECT id, category, name, description, image FROM products",
    function (error, results, fields) {
      if (error) throw error;

      console.log("The solution is: ", results);

      res.json(results);
    }
  );

  connection.end();
});

server.post("/product", (req, res) => {
  console.log(req.body);
  const { name, category, description, image } = req.body;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "INSERT INTO products (category, name, description, image) VALUES (?, ?, ?, ?)",
    [category, name, description, image],
    function (error, results, fields) {
      if (error) throw error;

      console.log("The INSERT result is: ", results);

      res.json({ success: "Product added successfully" });
    }
  );

  connection.end();
});

server.delete("/product/:id", (req, res) => {
  const id = req.params.id;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "DELETE FROM products WHERE id = ?",
    [id],
    function (error, results, fields) {
      if (error) throw error;

      console.log("The DELETE result is: ", results);

      res.json({ success: "Product deleted successfully" });
    }
  );

  connection.end();
});

server.get("/product/:id", (req, res) => {
  const id = req.params.id;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "SELECT id, category, name, description, image FROM products WHERE id = ?",
    [id],
    function (error, results, fields) {
      if (error) throw error;

      console.log("The SELECT result is: ", results);

      res.json(results[0]);
    }
  );

  connection.end();
});

server.put("/product/:id", (req, res) => {
  const id = req.params.id;
  const { name, category, description, image } = req.body;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "UPDATE products SET category = ?, name = ?, description = ?, image = ? WHERE id = ?",
    [category, name, description, image, id],
    function (error, results, fields) {
      if (error) throw error;

      console.log("The UPDATE result is: ", results);

      res.json({ success: "Product updated successfully" });
    }
  );

  connection.end();
});

//
// Start server
//

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
