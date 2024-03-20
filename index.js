const express = require("express");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "SQLWorkbench2.0",
  database: "businessquant",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("/ticker/all", (req, res) => {
  connection.query(
    'SELECT * FROM shares where ticker="AAPL"',
    (err, results) => {
      if (err) {
        console.error("Error fetching users:", err);
        res.status(500);
        res.send("Error fetching users");
        return;
      }
      res.json(results);
    }
  );
});

app.get("/ticker/revenuegp", (req, res) => {
  connection.query(
    'SELECT revenue,gp FROM shares WHERE ticker = "AAPL"',
    (err, results) => {
      if (err) {
        console.error("Error fetching users:", err);
        res.status(500);
        res.send("Error fetching users");
        return;
      }
      res.json(results);
    }
  );
});

app.get("/ticker/lastfiveyears", (req, res) => {
  connection.query(
    'SELECT revenue,gp FROM businessquant.shares s WHERE ticker = "AAPL" AND YEAR(s.date)  BETWEEN 2019 AND 2023',
    (err, results) => {
      if (err) {
        console.error("Error fetching users:", err);
        res.status(500);
        res.send("Error fetching users");
        return;
      }
      res.json(results);
    }
  );
});
