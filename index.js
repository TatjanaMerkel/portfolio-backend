const cors = require("cors");
const crypto = require("crypto");
const express = require("express");
const mysql = require("mysql");

const server = express();
const port = 3001;

server.use(express.json());
server.use(cors());

//
// Price type routes
//

server.get("/price-types/", (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "SELECT id, description FROM price_types",
    function (error, results, fields) {
      if (error) throw error;

      console.log("The solution is: ", results);

      res.json(results);
    }
  );

  connection.end();
});

server.post("/price-type/", (req, res) => {
  console.log(req.body);
  const { description } = req.body;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "INSERT INTO price_types (description) VALUES (?)",
    [description],
    function (error, results, fields) {
      if (error) throw error;

      console.log("The INSERT result is: ", results);

      res.json({ success: "Price type added successfully" });
    }
  );

  connection.end();
});

server.delete("/price-type/:id", (req, res) => {
  const id = req.params.id;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "DELETE FROM price_types WHERE id = ?",
    [id],
    function (error, results, fields) {
      if (error) throw error;

      console.log("The DELETE result is: ", results);

      res.json({ success: "Price type deleted successfully" });
    }
  );

  connection.end();
});

server.get("/price-type/:id", (req, res) => {
  const id = req.params.id;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "SELECT id, description FROM price_types WHERE id = ?",
    [id],
    function (error, results, fields) {
      if (error) throw error;

      console.log("The SELECT result is: ", results);

      res.json(results[0]);
    }
  );

  connection.end();
});

server.put("/price-type/:id", (req, res) => {
  const id = req.params.id;
  const { description } = req.body;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "UPDATE price_types SET description = ? WHERE id = ?",
    [description, id],
    function (error, results, fields) {
      if (error) throw error;

      console.log("The UPDATE result is: ", results);

      res.json({ success: "Price type updated successfully" });
    }
  );

  connection.end();
});

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

server.get("/products", (req, res) => {
  const category = req.query.category;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  if (category)
    sql =
      "SELECT id, category, price_type, name, description, price, image FROM products WHERE category = ?";
  else
    sql =
      "SELECT id, category, price_type, name, description, price, image FROM products";

  connection.query(sql, [category], function (error, results, fields) {
    if (error) throw error;

    console.log("The solution is: ", results);

    res.json(results);
  });

  connection.end();
});

function checkToken(token, success, error) {
  if (!token) {
    error();
    return;
  }
  
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "SELECT token FROM users",
    function (error, results, fields) {
      if (error) throw error;

      // Check if token contained
      let valid = false;
      for (const row of results) {
        if (row.token === token) {
          valid = true;
        }
      }

      if (valid) {
        success();
      } else {
        error();
      }
    }
  );
}

server.post("/product", (req, res) => {
  console.log();
  console.log("/product");
  console.log(req.body);

  const {
    category,
    price_type,
    name,
    description,
    price,
    image,
    token,
  } = req.body;

  checkToken(
    token,
    () => addProduct(category, price_type, name, description, price, image),
    () => res.status(500).json({ error: "Invalid Auth Token" })
  );
});

function addProduct(category, price_type, name, description, price, image) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "INSERT INTO products (category, price_type, name, description, price, image) VALUES (?, ?, ?, ?, ?, ?)",
    [category, price_type, name, description, price, image],
    function (error, results, fields) {
      if (error) throw error;

      console.log("The INSERT result is: ", results);

      res.json({ success: "Product added successfully" });
    }
  );

  connection.end();
}

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
    "SELECT id, category, price_type, name, description, price, image FROM products WHERE id = ?",
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
  const { name, category, price_type, description, price, image } = req.body;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  connection.query(
    "UPDATE products SET category = ?, price_type = ?, name = ?, description = ?, price = ?, image = ? WHERE id = ?",
    [category, price_type, name, description, price, image, id],
    function (error, results, fields) {
      if (error) throw error;

      console.log("The UPDATE result is: ", results);

      res.json({ success: "Product updated successfully" });
    }
  );

  connection.end();
});

//
// Login
//

server.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });

  connection.connect();

  const hash = crypto.createHash("md5").update(password).digest("hex");

  connection.query(
    "SELECT COUNT(*) AS count FROM users WHERE username = ? AND password = ?",
    [username, hash],
    function (error, results, fields) {
      if (error) throw error;

      const count = results[0].count;

      if (count === 1) {
        // Create session token
        const token = crypto.randomBytes(20).toString("hex");

        const connection2 = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "12345678",
          database: "portfolio_db",
        });

        connection2.connect();

        connection2.query(
          "UPDATE users SET token = ? WHERE username = ?",
          [token, username],
          function (error, results, fields) {
            if (error) throw error;

            console.log("The UPDATE result is: ", results);
          }
        );

        connection2.end();

        res.status(200).json({ token: token });
      } else {
        // Return error
        res.status(500).json({ error: "Invalid Credentials" });
      }
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
