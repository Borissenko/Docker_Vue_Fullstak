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


//Запросы между сервисами, минуя nginx. (http://auth:3002/api/user_kola)
//Запрос НЕ через nginx, поэтому НЕ ЗАБЫВАЕМ писать префикс "/api"(!) в ... .
//Префикс "/api" добавился из authApiUrl (http://auth:3002/api), и далее основное доменное имя http://auth:3002/ (и только оно) отбрасывается EXPRESSOM'ом.
//Поэтому в имени ПРИНИМАЮЩЕГО роутера должен фигурировать "/api"(!). Это МЕЖСЕРВИСНЫЙ запрос МИНУЯ NGNIX(!)(который может переписать по нашему указанию адрес, отбросив "/api").
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
