const { Client } = require("pg");
const expres = require("express");

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
  
  client
    .query("SELECT * FROM clothes")
    .then(function (result) {
      console.log("succes!");
      console.log(result.rowCount);
      resp.write(result.rows);
      resp.end();
    })
    .catch(function (error) {
      console.log("ooops");
      console.log(error);
      resp.write("Failed");
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
