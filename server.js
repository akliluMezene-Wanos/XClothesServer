const { Client } = require("pg");
const express = require("express"); 

app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "xclothes",
  password: "klwklw",
  port: 5432,
});

client.connect();


// app.delete("/clothes", (req, resp) => {
//   console.log("In /clothes DELETE")
//   resp.write("Please add the id at the path, eg like /clothes:21, inorder to delete at the id-21 ");
//   resp.end();

// });

app.delete("/clothes/:id", (req, resp) => {
  console.log("In /clothes DELETE");
  
  const myQuery = {
    text: "DELETE FROM clothes WHERE id = $1",
    values: [req.params.id]
  };
  client
    .query(myQuery)
    .then((result) => {
      console.log("succes!");
      console.log(result.rowCount);
      resp.writeHead(200, {
        "Content-Type": "text/json"
      });
      resp.write(JSON.stringify("ok"));
      resp.end();
    })
    .catch((error) => {
      console.log("ooops");
      console.log(error);
      resp.writeHead(200, {
        "Content-Type": "text/json"
      });
      resp.write(JSON.stringify("Failed"));  
      resp.end();
    });
});


app.post("/clothes", (req, resp) => {
  console.log("in /clothes POST"); 
  
  const myQuery = {
    text: "INSERT INTO clothes (code, manufacturer, image_filename, short_description, description_more, promo) VALUES ($1, $2,$3,$4,$5,$6)",
    values: [req.body.code, req.body.manufacturer, req.body.image_filename, req.body.short_description, req.body.description_more, req.body.promo]
  };
  client
    .query(myQuery)
    .then(function (result) {
      console.log("success!");
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

app.delete("/manufacturer/:id", (req, resp) => {
console.log("IN /manufacturer/:id DELETE");
const myQuery = {
  text: "DELETE FROM manufacturer WHERE id = $1",
  values: [req.params.id]
};
client
  .query(myQuery)
  .then((result) => {
    console.log("succes!");
    console.log(result.rowCount);
    resp.writeHead(200, {
      "Content-Type": "text/json"
    });
    resp.write(JSON.stringify("ok"));
    resp.end();
  })
  .catch((error) => {
    console.log("ooops");
    console.log(error);
    resp.writeHead(200, {
      "Content-Type": "text/json"
    });
    resp.write(JSON.stringify("Failed"));  
    resp.end();
  });
});

app.post("/manufacturer", (req, resp) => {
 console.log("In /manufacturer POST");

 const myQuery = {
  text: "INSERT INTO manufacturer (manufacturer_name, country, photo_link, description_short, more_description) VALUES ($1, $2,$3,$4,$5)",
  values: [req.body.manufacturer_name, req.body.country, req.body.photo_link, req.body.description_short, req.body.more_description]
};
client
  .query(myQuery)
  .then(function (result) {
    console.log("success!");
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

app.get("/manufacturer", (req, resp) => {
  let filterName = req.query.filterName;
  const myQuery = {
    text: "SELECT * FROM manufacturer WHERE manufacturer_name LIKE $1",
    values: ["%" + filterName + "%"],
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

app.post("/orders", (req, resp) =>  {
  console.log("In /orders POST");

 const myQuery = {
  text: "INSERT INTO orders (order_date, cloth_id, quantity, customer_code) VALUES ($1, $2,$3,$4)",
  values: [req.body.order_date, req.body.cloth_id, req.body.quantity, req.body.customer_code]
};
client
  .query(myQuery)
  .then(function (result) {
    console.log("success!");
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

app.get("/orders", (req, resp) => {
  let filterCustomer = req.query.filterCustomer;
  const myQuery = {
    text: "SELECT * FROM orders WHERE customer_code LIKE $1",
    values: ["%" + filterCustomer + "%"],
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

