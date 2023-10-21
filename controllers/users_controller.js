const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/users.js')


router.get('/', (req, res) => {
  res.json('Hello World')
})

router.get('/createaccount', (req, res) => {
  res.json('Create account route')
})

//new user registration form POST
// router.post('/createaccount', (req, res) => {
//   req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
//   User.create(req.body, (err, createdUser) => {
//     if(err){
//       console.log(err);
//       res.json(err.message)
//     } else {
//       console.log('user is created', createdUser);
//       res.json(createdUser)
//     }
//   })
// });
// create() no longer takes a callback
router.post('/createaccount', async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  try {
    res.json(await User.create(req.body))
    console.log(req.body)
    console.log("user created")
  } catch (error) {
    res.json(error.message)
  }

});

// user login  POST
router.put('/login', (req, res) => {
  console.log(req.body);
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      res.json('Oops, there was an error. Please try again')
    } else {
      if (!foundUser) {
        res.json('Username and password do not match. Please try again.')
      } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        res.json({ username: foundUser.username })
      } else {
        res.json('Username and password do not match. Please try again.')
      }
    }
  })
});


module.exports = router