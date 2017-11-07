var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');

var index = require('./routes/index');
var admin = require('./routes/admin');

var app = express();

// cookies
app.use(cookieParser());
//

// sessions
const Session = require('express-session');
const FileStore = require('session-file-store')(Session);

app.use(Session({
    store: new FileStore({
        path: path.join(__dirname, '/tmp'),
        encrypt: true
    }),
    secret: 'Super Secret !',
    resave: true,
    saveUninitialized: true,
    name : 'sessionId'
}));

// Cookies code

//  for debug only, helps to see if cookies exit
// app.use('/', function (req, res, next) {
//   console.log('##########################');
//   console.log('Cookies: ', req.cookies)
//   next();
// });

// set a cookie
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie !== undefined) {
    // yes, cookie was already present
    console.log('cookie exists', cookie);
  } else {
    // no: set a new cookie
      var randomNumber=Math.random().toString();
      randomNumber=randomNumber.substring(2,randomNumber.length);
      res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
      console.log('cookie created successfully');
  }
  next(); // <-- important!
});

// Not sure if this last line has to be included ???
// app.use(express.static(__dirname + '/public'));


app.use('/admin', function (req, res, next) {
	if (req.session.connected){
		return next();
	} else {
		return res.redirect('/');
	}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret : 'max', saveUninitialized: false, resave: false }));

app.use('/', index);
app.use('/admin', admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
