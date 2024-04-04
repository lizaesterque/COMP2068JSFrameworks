var express = require('express');
var router = express.Router();
const User = require("../models/user");
const passport = require("passport");

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('home', { title: 'RecipeHub' });
});

// get about page
router.get ('/about',function(req,res,next){
   res.render('about',{title: 'About Us'})
});

// GET /login
router.get("/login", (req, res, next) => {
// res.render('login', { title: 'Login' });
// Obtain session messages if any
let messages = req.session.messages || [];
// Clear messages
req.session.messages = [];
// Pass messages to view
res.render("login", { title: "Login", messages: messages });
});

// POST /login
// Syntax will be a bit different since login will be handled by passport

router.post("/login",
passport.authenticate("local", {
   successRedirect: "/recipes",
   failureRedirect: "/login",
   failureMessage: "Invalid credentials",
})

);

// / GET /register

router.get("/register", (req, res, next) => {
res.render("register", { title: "Create a new account" });
});

//POST /register

router.post("/register", (req, res, next) => {
// Create a new user based on the information from the page
// three parameters: new user object, password, callback function
User.register(
   new User({
   username: req.body.username,
   }),
   req.body.password,
   (err, newUser) => {
   if (err) {
      console.log(err);
      // take user back and reload register page
      return res.redirect("/register");
   } else {

      // log user in and redirect

      req.login(newUser, (err) => {
         res.redirect("/recipes");
      });

   }

   }

);

});

//GET /LOGOUT
router.get("/logout",(req,res,next) => {
   req.logout((err)=> {
      res.redirect("/login");
   });
});


//GET hadle for github
router.get(
   "/github",
   passport.authenticate("github",{scope:["user.email"]})
);

//get for github callback
router.get(
   "/github/callback",
   passport.authenticate("github",{failureRedirect:"/login"}),
   (req,res,next)=>{
      res.redirect("/recipes");
   }
);

module.exports = router;


