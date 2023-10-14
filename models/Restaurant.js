const mongoose = require("mongoose")
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    restaurantId: String,
    name: String,
    description: String,
    // Add more fields as needed
  });

const Restaurant = mongoose.model("Restaurant", restaurantSchema)

module.exports = Restaurant