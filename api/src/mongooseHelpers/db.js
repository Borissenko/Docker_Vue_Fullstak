const mongoose = require("mongoose");
const {MONGO_URL, mode} = require("../configuration");  //MONGO_URL=mongodb://api_db:27017/api, прописано в docker-compose.yml

module.exports.connectDb = () => {
  mongoose.connect(MONGO_URL, {useNewUrlParser: true})
  // mongoose.createConnection(MONGO_URL, {useNewUrlParser: true})  // не работает
  console.log(' =============== 1. mongoose.connections.length = ', mongoose.connections.length)
  return mongoose.connection;
};








