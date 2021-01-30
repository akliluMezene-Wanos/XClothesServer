const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'xclothes',
    password: 'klwklw',
    port: 5432,
  })
  
  client.connect()
  client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
  })

  console.log("server is finishing");
  
