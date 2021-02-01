const { Client } = require("pg");
const expres = require("express");
const { json } = require("body-parser");

app = expres();

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "xclothes",
  password: "klwklw",
  port: 5432,
});

client.connect();

app.get("/clothes", (req, resp) => {
  let filterCode = req.query.filterCode;
  const myQuery = {
    text:"SELECT * FROM clothes WHERE code LIKE $1",
    values: ["%"+filterCode+"%"]
  }
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
