const mongoose = require("mongoose");
const {productSchema} = require("../schemas/commonSchemas");

module.exports.laptopModel = mongoose.model('laptop', productSchema);














