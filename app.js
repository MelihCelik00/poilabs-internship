var createError = require('http-errors');
const express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
var logger = require('morgan');
// const sequelize = require('sequelize');
// const dotenv = require('dotenv').config();
// const db = require('./models');

const bodyParser = require("body-parser");

const redis = require("./components/redis");

/* const express = require('express');
const cookieParser = require('cookie-parser')
const userRoutes = require('../routes/users') */

// get router methods with require
const indexRouter = require('./routes/index');
const userRoutes = require('./routes/users');


var app = express();

const cors = require("cors")

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//synchronizing the database and forcing it to false so we dont lose data
// db.sequelize.sync({ force: true }).then( () => {
//     console.log("db has been re sync!");
// })

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());


// routes for the user API
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/users', userRoutes)

// app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))

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

