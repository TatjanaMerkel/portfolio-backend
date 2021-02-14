const cors = require("cors");
const crypto = require("crypto");
const express = require("express");
const mysql = require("mysql");

const server = express();
const port = 3001;

server.use(express.json());
server.use(cors());

//
// Helper
//

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

//
// GET price_types
//

server.get("/price-types", (req, res) => {
  console.log();
  console.log("GET /price-types");

  getPriceTypes(res);
});

function getPriceTypes(res) {
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
      if (error)
        throw error;

      console.log("The solution is: ", results);

      res.json(results);
    }
  );

  connection.end();
}

//
// POST price_type
//

server.post("/price-type", (req, res) => {
  console.log();
  console.log("POST /price-type");
  console.log(req.body);

  const { description, token } = req.body;

  checkToken(
    token,
    () => postPriceType(description, res),
    () => res.status(500).json({ error: "Invalid Auth Token" })
  );
});

function postPriceType(description, res) {
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
      if (error)
        throw error;

      console.log("The INSERT result is: ", results);

      res.status(201).json({ success: "Price type added successfully" });
    }
  );

  connection.end();
}

//
// DELETE price_types
//

server.delete("/price-type/:id", (req, res) => {
  console.log();
  console.log("DELETE /price-type");

  const id = req.params.id;
  const { token } = req.body;

  checkToken(
    token,
    () => deletePriceType(id, res),
    () => res.status(500).json({ error: "Invalid Auth Token" })
  );
});

function deletePriceType(id, res) {
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
      if (error)
        throw error;

      console.log("The DELETE result is: ", results);

      res.json({ success: "Price type deleted successfully" });
    }
  );

  connection.end();
}

//
// GET price_type
//

server.get("/price-type/:id", (req, res) => {
  console.log();
  console.log("GET /price-type");

  const id = req.params.id;

  getPriceType(id, res);
});

function getPriceType(id, res) {
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
      if (error)
        throw error;

      console.log("The SELECT result is: ", results);

      res.json(results[0]);
    }
  );

  connection.end();
}

//
// PUT price_type
//

server.put("/price-type/:id", (req, res) => {
  console.log();
  console.log("PUT /price-type");
  console.log(req.body);

  const id = req.params.id;
  const { description, token } = req.body;

  checkToken(
    token,
    () => putPriceType(description, id, res),
    () => res.status(500).json({ error: "Invalid Auth Token" })
  );
});

function putPriceType(description, id, res) {
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
      if (error)
        throw error;

      console.log("The UPDATE result is: ", results);

      res.json({ success: "Price type updated successfully" });
    }
  );

  connection.end();
}

//
// GET categories
//

server.get("/categories/", (req, res) => {
  console.log();
  console.log("GET /categories");
  console.log(req.body);

  getCategories(res);
});

function getCategories(res) {
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
      if (error)
        throw error;

      console.log("The solution is: ", results);

      res.json(results);
    }
  );

  connection.end();
}

//
// POST category
//

server.post("/category/", (req, res) => {
  console.log();
  console.log("POST /category");
  console.log(req.body);

  const { name, token } = req.body;

  checkToken(
    token,
    () => postCategory(name, res),
    () => res.status(500).json({ error: "Invalid Auth Token" })
  );
});

function postCategory(name, res) {
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
      if (error)
        throw error;

      console.log("The INSERT result is: ", results);

      res.status(201).json({ success: "Category added successfully" });
    }
  );

  connection.end();
}

//
// DELETE category
//

server.delete("/category/:id", (req, res) => {
  console.log();
  console.log("DELETE /category");

  const id = req.params.id;
  const { token } = req.body;

  checkToken(
    token,
    () => deleteCategory(id, res),
    () => res.status(500).json({ error: "Invalid Auth Token" })
  );
});

function deleteCategory(id, res) {
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
      if (error)
        throw error;

      console.log("The DELETE result is: ", results);

      res.json({ success: "Category deleted successfully" });
    }
  );

  connection.end();
}

//
// GET category
//

server.get("/category/:id", (req, res) => {
  console.log();
  console.log("GET /category");

  const id = req.params.id;

  getCategory(id, res);
});

function getCategory(id, res) {
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
      if (error)
        throw error;

      console.log("The SELECT result is: ", results);

      res.json(results[0]);
    }
  );

  connection.end();
}

//
// PUT category
//

server.put("/category/:id", (req, res) => {
  console.log();
  console.log("PUT /category");
  console.log(req.body);

  const id = req.params.id;
  const { name, token } = req.body;

  checkToken(
    token,
    () => putCategory(name, id, res),
    () => res.status(500).json({ error: "Invalid Auth Token" })
  );
});

function putCategory(name, id, res) {
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
      if (error)
        throw error;

      console.log("The UPDATE result is: ", results);

      res.json({ success: "Category updated successfully" });
    }
  );

  connection.end();
}

//
// GET products
//

server.get("/products", (req, res) => {
  console.log();
  console.log("GET /products");

  const category = req.query.category;

  getProducts(category, res);
});

function getProducts(category, res) {
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
}

//
// POST product
//

server.post("/product", (req, res) => {
  console.log();
  console.log("POST /products");
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
    () => postProduct(category, price_type, name, description, price, image, res),
    () => res.status(500).json({ error: "Invalid Auth Token" })
  );
});

function postProduct(category, price_type, name, description, price, image, res) {
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

      res.status(201).json({ success: "Product added successfully" });
    }
  );

  connection.end();
}

//
// DELETE product
//

server.delete("/product/:id", (req, res) => {
  console.log();
  console.log("DELETE /product");

  const id = req.params.id;
  const { token } = req.body;

  checkToken(
    token,
    () => deleteProduct(id, res),
    () => res.status(500).json({ error: "Invalid Auth Token" })
  );
});

function deleteProduct(id, res) {
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
}

//
// GET product
//

server.get("/product/:id", (req, res) => {
  console.log();
  console.log("GET /product");

  const id = req.params.id;

  getProduct(id, res);
});

function getProduct(id, res) {
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
}

//
// PUT product
//

server.put("/product/:id", (req, res) => {
  console.log();
  console.log("PUT /product");
  console.log(req.body);

  const id = req.params.id;
  const { name, category, price_type, description, price, image, token } = req.body;

  checkToken(
    token,
    () => putProduct(name, category, price_type, description, price, image, id, res),
    () => res.status(500).json({ error: "Invalid Auth Token" })
  );
});

function putProduct(name, category, price_type, description, price, image, id, res) {
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
}

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

// test comment
