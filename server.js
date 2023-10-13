const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

const mongoURI = 'MONGODB_URI'; // Replace with actual MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const Restaurant = mongoose.model('Restaurant', {
  name: String,
  description: String,
  // Add more fields as needed
});

const MenuItem = mongoose.model('MenuItem', {
  restaurantId: String,
  name: String,
  price: Number,
  // Add more fields as needed
});

const Review = mongoose.model('Review', {
  menuItemId: String,
  text: String,
  rating: Number,
  // Add more fields as needed
});

app.use(cors());
app.use(bodyParser.json());

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

app.get('/api/restaurants', (req, res) => {
  Restaurant.find({}, (err, restaurants) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving data' });
    }
    return res.json(restaurants);
  });
});

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

app.get('/api/menu-items', (req, res) => {
  MenuItem.find({}, (err, menuItems) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving data' });
    }
    return res.json(menuItems);
  });
});

// Implement similar routes for reviews, images, and additional functionality.

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
