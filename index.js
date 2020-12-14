const cors = require("cors");
const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3001;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products/", (req, res) => {

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "portfolio_db",
  });
  
  connection.connect();

  connection.query(
    "SELECT category, name, description, image FROM products",
    function (error, results, fields) {
      if (error) throw error;

      console.log("The solution is: ", results);

      res.json(results);
    }
  );

  connection.end();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
