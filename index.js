const cors = require('cors');
const express = require("express");
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345678',
  database : 'my_db'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();

const app = express();
const port = 3001;

app.use(cors());

products = [
  {
    id: 1,
    category: 'fruits',
    title: "Papaya",
    description: "Papayas are great",
    image:
      "https://5.imimg.com/data5/GG/CC/VN/SELLER-47385627/fresh-high-quality-papaya-500x500.jpg",
  },
  {
    id: 2,
    category: 'fruits',
    title: "Banana",
    description: "Tati is great",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/61fZ%2BYAYGaL._SX679_.jpg",
  },
  {
    id: 3,
    category: 'fruits',
    title: "Blueberry",
    description: "Blueberries are great",
    image:
      "https://5.imimg.com/data5/RI/NH/MY-50344271/natural-fresh-blueberry-500x500.jpg",
  },
  {
    id: 4,
    category: 'vegetables',
    title: "Cucumber",
    description: "Cucumbers are great",
    image:
      "https://images.heb.com/is/image/HEBGrocery/000319432",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products/", (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
