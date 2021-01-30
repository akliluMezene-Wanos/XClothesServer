const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'xclothes',
    password: 'klwklw',
    port: 5432,
  })
  
  client.connect()
  client
  .query('SELECT * FROM manufacturer')
  .then(function (result) {
    console.log("success!");
    console.log(result.rowCount);
  })
  .catch(function (error) {
   console.log("ooops");
   console.log(error);
  });

  console.log("server is finishing");
  
