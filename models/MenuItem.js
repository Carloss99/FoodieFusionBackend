const mongoose = require("mongoose")
const Schema = mongoose.Schema

const menuItemSchema = new Schema({
    restaurantId: String,
    name: String,
    price: Number
    // Add more fields as needed
  });

const MenuItem = mongoose.model("MenuItem", menuItemSchema)

module.exports = MenuItem