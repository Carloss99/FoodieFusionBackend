const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    restaurantName: String,
    menuItemName: String,
    text: String,
    rating: Number,
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        // required: true
    }
    // Add more fields as needed
    },
    {
        timestamps: true
    }
  );

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review