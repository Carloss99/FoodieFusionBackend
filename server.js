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

// --------------------------READ (Index Route) --------------------------
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
// get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    res.json(await Review.find({}))
  } catch (error) {
    res.status(500).json((error))
  }
});

// --------------------------CREATE (New and Post Route) --------------------------
// GET /review-menu-items/new Display a form for adding a new menu item review.
// POST /review-menu-items: Create a new menu item review
// create restaurant
// app.post('/api/restaurants', (req, res) => {
//   const { name, description } = req.body;
//   const newRestaurant = new Restaurant({ name, description });

//   newRestaurant.save((err, restaurant) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error creating restaurant' });
//     }
//     return res.status(201).json(restaurant);
//   });
// });
app.post('/api/restaurants', async (req, res) => {
  try{
    res.json(await Restaurant.create(req.body))
}catch (error){
    res.status(400).json(error)
}
});

// create menu item 
// app.post('/api/menu-items', (req, res) => {
//   const { restaurantId, name, price } = req.body;
//   const newMenuItem = new MenuItem({ restaurantId, name, price });

//   newMenuItem.save((err, menuItem) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error creating menu item' });
//     }
//     return res.status(201).json(menuItem);
//   });
// });
app.post("/api/menu-items", async (req, res)=> {
  try{
    res.json(await MenuItem.create(req.body))
  } catch (error) {
    res.status(400).json(error)
  }
})

// create review
app.post('/api/reviews', async (req, res) => {
  try{
    res.json(await Review.create(req.body))
}catch (error){
    res.status(400).json(error)
}
})

// ------------------------ SHOW --------------------------
// GET /review-menu-items/:id Display the details of a specific menu item review.
app.get("/api/reviews/:id", async(req,res)=>{
  try{
      res.json(await Review.findById(req.params.id))
  } catch (error){
      res.status(400).json(error)
  }
})

// -------------------------- UPDATE / Edit -------------------------- 
// GET /review-menu-items/id/edit: Display a form for editing a menu item review.
// PUT /review-menu-items/id: Update a menu item review.
app.get("/api/reviews/:id/edit", async(req,res)=>{
  try{
      res.json(await Review.findById(req.params.id))
  } catch (error){
      res.status(400).json(error)
  }
})
app.put("/api/reviews/:id", async(req,res)=>{
  const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {new:true})
  console.log(updatedReview)
})

// edit menu item
app.get("/api/menu-items/:id/edit", async(req,res)=>{
  try{
      res.json(await MenuItem.findById(req.params.id))
  } catch (error){
      res.status(400).json(error)
  }
})
app.put("/api/menu-items/:id", async(req,res)=>{
  const updatedReview = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {new:true})
  console.log(updatedReview)
})

// edit restaurant
app.get("/api/restaurants/:id/edit", async(req,res)=>{
  try{
      res.json(await Restaurant.findById(req.params.id))
  } catch (error){
      res.status(400).json(error)
  }
})
app.put("/api/restaurants/:id", async(req,res)=>{
  const updatedReview = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new:true})
  console.log(updatedReview)
})

// -------------------------- DELETE --------------------------
// DELETE /review-menu-items/id: Delete a menu item review
app.delete("/api/reviews/:id", async(req, res) => {
  try {
    res.json(await Review.findByIdAndDelete(req.params.id))
    console.log(`${req.params.id} deleted`)
  } catch (error) {
    response.send(400).json(error)
  }
})

//temporary
// app.delete('/api/reviews', async (req,res) => {
//   try{
//     res.json(await Review.deleteMany({}))
//   }catch(err) {
//     res.send(400).json(err)
//   }
// })

// delete menu item
app.delete("/api/menu-items/:id", async(req, res) => {
  try {
    res.json(await MenuItem.findByIdAndDelete(req.params.id))
    console.log(`${req.params.id} deleted`)
  } catch (error) {
    response.send(400).json(error)
  }
})
// delete restaurant
app.delete("/api/restaurants/:id", async(req, res) => {
  try {
    res.json(await Restaurant.findByIdAndDelete(req.params.id))
    console.log(`${req.params.id} deleted`)
  } catch (error) {
    response.send(400).json(error)
  }
})

// LISTEN
app.listen(PORT, () => {
  console.log(`Listening to : ${PORT}`)
})


