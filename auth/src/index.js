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

//Запросы МЕЖДУ сервисами.
//Запрос НЕ через nginx, поэтому НЕ ЗАБЫВАЕМ писать префикс "/api"(!).
//В имени принимающего роутера должен фигурировать "/api"(!). Это МЕЖСЕРВИСНЫЙ запрос МИНУЯ NGNIX(!).
app.get("/api/:userName", (req, res) => {
  let userName = req.params.userName
  res.json({
    auth: `${userName} is confirmed`
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
