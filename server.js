//Page to hold all our routes

//declare a variable for our port number
const PORT = process.env.PORT || 4000;

// Import Dependencies
const express = require("express");
const cors = require("cors");

// Import JSON files
const projects = require("./projects.json");
const about = require("./about.json");

// Create our app object
const app = express();

// set up middleware
app.use(cors());

//home route for testing our app
app.get("/", (req, res) => {
  res.send("Hello World");
});

// READ (Index Route) "My Reviews page"
// GET /review-menu-items Display a list of all reviewed menu items.

// CREATE (New and Post Route) 
// GET /review-menu-items/new Display a form for adding a new menu item review.
// POST /review-menu-items: Create a new menu item review

// SHOW
// GET /review-menu-items/:id Display the details of a specific menu item review.

// UPDATE / Edit 
// GET /review-menu-items/id/edit: Display a form for editing a menu item review.
// PUT /review-menu-items/id: Update a menu item review.

// DELETE
// DELETE /review-menu-items/id: Delete a menu item review



app.listen("/", (req, res) => {
    res.send(`Listening to :`, PORT)
})