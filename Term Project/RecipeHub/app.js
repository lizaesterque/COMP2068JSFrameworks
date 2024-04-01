const mongoose = require("mongoose");

// Database connection
const database = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(
      "mongodb+srv://lizaesterque:Lizandra@cluster0.0im5keo.mongodb.net/Recipehub",
      connectionParams
    );
    console.log("Database connected");
  } catch (error) {
    console.error(error);
    console.log("Failed to connect to database");
  }
};

// Call the database function to establish connection
database();



// Express initialization
var express = require('express');
var app = express();

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

app.use('/recipes', recipesRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname + '/views/partials'), (err) => {});



app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
