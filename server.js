const { Client } = require('pg')
const expres = require("express");

app = expres();

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'xclothes',
    password: 'klwklw',
    port: 5432,
  })
  
//   client.connect()
//   client
//   .query('SELECT * FROM manufacturer')
//   .then(function (result) {
//     console.log("success!");
//     console.log(result.rowCount);
//     client.end();
//   })
//   .catch(function (error) {
//    console.log("ooops");
//    console.log(error);
//    client.end();
//   });

  
  app.get("/", (req, resp) => {
      resp.write("IN GET");
      resp.end();
  }); 

  app.get("/clothes", (req, resp) => {
      resp.write("In /clothes");
      resp.end();
  })
  
  const port = 3000;
  app.listen(port, function () {console.log("server is started and listening to port " + port)});
  
