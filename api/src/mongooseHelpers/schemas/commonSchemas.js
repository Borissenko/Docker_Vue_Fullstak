const mongoose = require("mongoose");

const specificationsSchema = new mongoose.Schema({
  screenDiagonal: Number,
  color: String,
  warranty: Number,
  release: Number
})

module.exports.productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  img: String,
  specifications: specificationsSchema
});




