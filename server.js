const PORT = process.env.PORT || 4000;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on("connected", () => {
  console.log("mongoose connected");
});

const MenuItem = require("./models/MenuItem");
const Restaurant = require("./models/Restaurant");
const Review = require("./models/Review");
const User = require("./models/users");
//variable for user auth routes 
const userController = require("./controllers/users_controller")

// const faker = require('faker'); // Import the faker library
const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/api/userreviews', userController)

// Home route for testing your app
app.get("/", async (req, res) => {
  res.send("Hello World");
});

// -------------------------- RESTAURANTS --------------------------

// GET all restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    res.json(await Restaurant.find({}));
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create a new restaurant
app.post('/api/restaurants', async (req, res) => {
  try {
    res.json(await Restaurant.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Edit a restaurant
app.get("/api/restaurants/:id/edit", async (req, res) => {
  try {
    res.json(await Restaurant.findById(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

app.put("/api/restaurants/:id", async (req, res) => {
  const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  console.log(updatedRestaurant);
});

// Delete a restaurant
app.delete("/api/restaurants/:id", async (req, res) => {
  try {
    res.json(await Restaurant.findByIdAndDelete(req.params.id));
    console.log(`${req.params.id} deleted`);
  } catch (error) {
    res.status(400).json(error);
  }
});

// -------------------------- MENU ITEMS --------------------------

// GET all menu items
app.get('/api/menu-items', async (req, res) => {
  try {
    res.json(await MenuItem.find({}));
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create a new menu item
app.post("/api/menu-items", async (req, res) => {
  try {
    res.json(await MenuItem.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Edit a menu item
app.get("/api/menu-items/:id/edit", async (req, res) => {
  try {
    res.json(await MenuItem.findById(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

app.put("/api/menu-items/:id", async (req, res) => {
  const updatedMenuItem = await MenuItem.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  console.log(updatedMenuItem);
});

// Delete a menu item
app.delete("/api/menu-items/:id", async (req, res) => {
  try {
    res.json(await MenuItem.findByIdAndDelete(req.params.id));
    console.log(`${req.params.id} deleted`);
  } catch (error) {
    res.status(400).json(error);
  }
});

// -------------------------- REVIEWS --------------------------

// Generate and add fake reviews to the database
// app.post('/api/fake-reviews', async (req, res) => {
//   try {
//     const fakeReviews = [];
//     for (let i = 0; i < 10; i++) {
//       const fakeReview = new Review({
//         restaurantName: faker.company.companyName(),
//         menuItemName: faker.lorem.word(),
//         text: faker.lorem.paragraph(),
//         rating: faker.datatype.number({ min: 1, max: 5 }),
//       });

//       fakeReviews.push(fakeReview);
//     }

//     // Save the fake reviews to the database
//     await Review.insertMany(fakeReviews);

//     res.json({ message: 'Fake reviews created and added to the database' });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// GET all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    res.json(await Review.find({}));
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET logged in user reviews 
app.get('/api/reviews/user/:userName', async (req, res) => {
  try {
    let user = await User.findOne({username: req.params.userName })
    console.log(Review)
    let allReviews = await Review.find({author: user.id})
    console.log(allReviews)
    res.json(await Review.find({author: user.id}))
  } catch (error) {
    res.status(500).json(error);
  }
})

// Create a new review
app.post('/api/reviews', async (req, res) => {
  try {
    res.json(await Review.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Display details of a specific review
app.get("/api/reviews/:id", async (req, res) => {
  try {
    res.json(await Review.findById(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Edit a review
app.get("/api/reviews/:id/edit", async (req, res) => {
  try {
    res.json(await Review.findById(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

app.put("/api/reviews/:id", async (req, res) => {
  const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  console.log(updatedReview);
});

// Delete a review
app.delete("/api/reviews/:id", async (req, res) => {
  try {
    res.json(await Review.findByIdAndDelete(req.params.id));
    console.log(`${req.params.id} deleted`);
  } catch (error) {
    res.status(400).json(error);
  }
});

//temporary
// app.delete(‘/api/reviews’, async (req,res) => {
//     try{
//       res.json(await Review.deleteMany({}))
//     }catch(err) {
//       res.send(400).json(err)
//     }
//   })



// LISTEN
app.listen(PORT, () => {
  console.log(`Listening to : ${PORT}`);
});