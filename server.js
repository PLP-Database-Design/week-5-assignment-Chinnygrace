// import our dependencies
const express = require("express");
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv");

//cors and ejs

// configure environment variables
dotenv.config();

//create a connection object
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//test the connection
db.connect((err) => {
  //if the connection is not successful
  if (err) {
    return console.log("Error connecting to the database: ", err);
  }
  //connection is successful
  console.log("Successfully connected to MYSQL: ", db.threadId);
});

app.set("view engine", "ejs");
app.set("view", __dirname + "/views");

//retrieve all patients
app.get("", (req, res) => {
  const getPatients =
    "SELECT first_name, last_name, date_of_birth, patient_id FROM patients";
  db.query(getPatients, (err, data) => {
    //if I have an error
    if (err) {
      return res.status(400).send("Failed to get patients", err);
    }
    // res.status(200).render('data', {data})
    res.status(200).send(data);
  });
});

//retrieve all providers
app.get("", (req, res) => {
  const getProviders =
    "SELECT first_name, last_name, provider_specialty FROM providers";
  db.query(getProviders, (err, data) => {
    //if I get an error
    if (err) {
      return res.status(400).send("Failed to get providers", err);
    }
    res.status(200).send(data);
  });
});

//retrieve all patients by their firstname
app.get("", (req, res) => {
  const getProvidersFirstname = "SELECT * FROM patients GROUP BY first_name";
  db.query(getProvidersFirstname, (err, data) => {
    //if I get an error
    if (err) {
      return res.status(400).send("Failed to get patients firstname", err);
    }
    res.status(200).send(data);
  });
});

//retrieve all providers by their specialty
app.get("", (req, res) => {
  const getProvidersSpecialty = "SELECT * FROM providers GROUP BY specialty";
  db.query(getProvidersSpecialty, (err, data) => {
    //if I get an error
    if (err) {
      return res.status(400).send("Failed to get providers specialty", err);
    }
    res.status(200).send(data);
  });
});

//start and listen to the server
app.listen(3300, () => {
  console.log("Server is running on port 3300...");
});
