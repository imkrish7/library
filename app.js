var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');

var fccTestingRoutes = require('./routes/fcctesting.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({ origin:"*"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb+srv://krishna:kamal123@freecodecampcluster-umfmh.mongodb.net/test?retryWrites=true",{useNewUrlParser:true})

app.use('/', indexRouter);


fccTestingRoutes(indexRouter);

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
