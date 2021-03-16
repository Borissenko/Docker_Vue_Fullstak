const express = require("express");
const axios = require("axios");
const bodyParser = require('body-parser')
const { port, host, db, apiUrl } = require("./configuration");
const { connectDb } = require("./helpers/db");

const app = express();
app.use(bodyParser.json())            //(!) Обязателен для всех запросов, которые имеют pl.
app.use(bodyParser.urlencoded({ extended: true }));


// ## Возможно, еще потребуется скорректировать 'content-type':
// await axios.post(url, pl, {headers: {'content-type': 'application/json;charset=UTF-8'}})

app.get("/test", (req, res) => {
  res.send("Our AUTH-server is working");
});

app.get("/testwithapidata", (req, res) => {
  axios.get(apiUrl + "/testapidata").then(response => {
    res.json({
      testapidata: response.data.testapidata
    });
  });
})

app.get("/api/kola", (req, res) => {
  res.json({
    auth: "kola is confirmed"
  });
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started AUTH-service on port ${port}`);
    console.log(`Our host is ${host}`);
    console.log(`Database url ${db}`);
  });
};

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);
