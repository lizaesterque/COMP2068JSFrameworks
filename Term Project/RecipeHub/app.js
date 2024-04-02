const mongoose = require("mongoose");
var express = require('express');
var app = express();
var User= require('./models/user');


var GitHubStrategy= require('passport-github2').Strategy;

var configs = require('../RecipeHub/configs/globals');

// var acess_token=""



// Database connection
const database = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(
      "mongodb+srv://lizaesterque:Lizandra@cluster0.0im5keo.mongodb.net/Recipehub",
      connectionParams,
      console.log("Database connected")
    );
    
  } catch (error) {
    console.error(error);
    console.log("Failed to connect to database");
  }
};

// Call the database function to establish connection
database();

var passport = require('passport');
var session = require('express-session');



// Express initialization
// var express = require('express');
// var app = express();

// require('./insertRecipes')(app); -> this was used to add recipes to the database

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');


var indexRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var recipesRouter = require('./routes/recipes');
const { config } = require("dotenv");
const { db } = require("./models/recipe");



// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname + '/views/partials'), (err) => {});


app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configure passport module express-session
app.use(session({
  secret:'key123',
  resave:true,
  saveUninitialized:false
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//link the passport to the user model
passport.use(User.createStrategy());

//gitub strategy 
passport.use(new GitHubStrategy(
  {
  clientID:configs.github.clientID,
  clientSecret:configs.github.clientSecret,
  callbackURL: configs.github.callbackUrl,
},
async(accessToken,refreshToken, profile, done)=>{
//serach bt ID
const user= await User.findOne({oauth:profile.id});
if (user) {
  return done(null,user);
}   
  else{
    // new user register in db
    const newUser= new User ({
      username:profile.username,
      oauthId:profile.id,
      oauthprovider: 'Github',
      created: Date.now()
    });
    //add to mongodb
    const saveUser=await newUser.save();
    return done(null, saveUser);
  }
}



));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routing config
app.use('/recipes', recipesRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
