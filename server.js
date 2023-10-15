//declare a variable for our port number
const PORT = process.env.PORT || 4000;

// Import Dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
require("dotenv").config()

// database connection
const mongoose = require("mongoose")
const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI)
const db = mongoose.connection
db.on("connected", () => { console.log("mongoose connected") })

// Database Variables
const MenuItem = require("./models/MenuItem")
const Restaurant = require("./models/Restaurant")
const Review = require("./models/Review")
const User = require("./models/users")

// Create our app object
const app = express();

// set up middleware
app.use(cors());
app.use(bodyParser.json());

//home route for testing our app
app.get("/", async (req, res) => {
  res.send("Hello World");
});

// READ (Index Route) "My Reviews page"
// GET /review-menu-items Display a list of all reviewed menu items.
// get all restaurants
// app.get('/api/restaurants', (req, res) => {
//   Restaurant.find({}, (err, restaurants) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error retrieving data' });
//     }
//     return res.json(restaurants);
//   });
// });
app.get('/api/restaurants', async (req, res) => {
  try {
    res.json(await Restaurant.find({}))
  } catch (error) {
    res.status(500).json(error)
  }
})

// get menu items
// app.get('/api/menu-items', async (req, res) => {
//   MenuItem.find({}, (err, menuItems) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error retrieving data' });
//     }
//     return res.json(menuItems);
//   });
// });
app.get('/api/menu-items', async (req, res) => {
  try {
    res.json(await MenuItem.find({}))
  } catch (error) {
    res.status(500).json((error))
  }
});

// CREATE (New and Post Route) 
// GET /review-menu-items/new Display a form for adding a new menu item review.
// POST /review-menu-items: Create a new menu item review
// create restaurant
app.post('/api/restaurants', (req, res) => {
  const { name, description } = req.body;
  const newRestaurant = new Restaurant({ name, description });

  newRestaurant.save((err, restaurant) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating restaurant' });
    }
    return res.status(201).json(restaurant);
  });
});
// create menu item 
app.post('/api/menu-items', (req, res) => {
  const { restaurantId, name, price } = req.body;
  const newMenuItem = new MenuItem({ restaurantId, name, price });

  newMenuItem.save((err, menuItem) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating menu item' });
    }
    return res.status(201).json(menuItem);
  });
});

// SHOW
// GET /review-menu-items/:id Display the details of a specific menu item review.

// UPDATE / Edit 
// GET /review-menu-items/id/edit: Display a form for editing a menu item review.
// PUT /review-menu-items/id: Update a menu item review.

// DELETE
// DELETE /review-menu-items/id: Delete a menu item review



app.listen(PORT, () => {
  console.log(`Listening to : ${PORT}`)
})


