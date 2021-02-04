const { Client } = require("pg");
const express = require("express"); 
//const { urlencoded } = require("body-parser");

app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "xclothes",
  password: "klwklw",
  port: 5432,
});

client.connect();

app.post("/clothes", (req, resp) => {
  console.log("in /clothes POST"); 
  
  const myQuery = {
    text: "INSERT INTO clothes (code, manufacturer, image_filename, short_description, description_more, promo) VALUES ($1, $2,$3,$4,$5,$6)",
    values: [req.body.code, req.body.manufacturer, req.image_filename, req.body.short_description, req.body.description_more, req.body.promo]
  };
  client
    .query(myQuery)
    .then(function (result) {
      console.log("succes!");
      console.log(result.rowCount);
      resp.writeHead(200, {
        "Content-Type": "text/json",
      });
      resp.write(JSON.stringify("ok"));
      resp.end();
    })
    .catch(function (error) {
      console.log("ooops");
      console.log(error);
      resp.writeHead(200, {
        "Content-Type": "text/json",
      });
      resp.write(JSON.stringify("Failed"));
      resp.end();
    });
 });

app.get("/clothes", (req, resp) => {
  let filterCode = req.query.filterCode;
  const myQuery = {
    text: "SELECT * FROM clothes WHERE code LIKE $1",
    values: ["%" + filterCode + "%"],
  };
  client
    .query(myQuery)
    .then(function (result) {
      console.log("succes!");
      console.log(result.rowCount);
      resp.writeHead(200, {
        "Content-Type": "text/json",
      });
      resp.write(JSON.stringify(result.rows));
      resp.end();
    })
    .catch(function (error) {
      console.log("ooops");
      console.log(error);
      resp.writeHead(200, {
        "Content-Type": "text/json",
      });
      resp.write(JSON.stringify("Failed"));
      resp.end();
    });
});

app.get("/", (req, resp) => {
  resp.write("In GET /");
  resp.end();
});

const port = 3000;
app.listen(port, function () {
  console.log("server is started and listening to port " + port);
});
