const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const connection = require('./database/connection');
const indexRouter = require('./routes/index');
const managementRouter = require('./routes/management');
const loginRouter = require('./routes/login');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());

// Requiere mas investigacion - Posible problema con hidden inputs y post request en forms
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session Passport
app.use(session({
  secret: 'v4q478vb(&(&"$¨NUvnjdrbvÍ#BVNJE¨r',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 4*60*60*1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(function verify(username, password, cb) {
  
  let sql = 'SELECT id, matricula, role, password FROM users WHERE matricula = ? AND password = ?';
  connection.query(sql, [username, password], function(err, data){
    if (err) { return cb(err); }
    if (!data.length) {
      console.log('Acceso Denegado'); 
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
    else {
      if (data[0].matricula == username && data[0].password == password) {
        return cb(null, data);
      }
    };
  });
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

// Script de rutas predefinidas
app.use('/', indexRouter);
app.use('/management', managementRouter);
app.use('/login', loginRouter);

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