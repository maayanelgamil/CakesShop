var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var Connection = require('tedious').Connection;
var bodyParser = require('body-parser');
var http = require('http');         // protocol
var DButilsAzure = require('./Server/utils');
var users = require('./Server/routes/Users');
var cakes = require('./Server/routes/Cakes');
var route = require('./Server/routes/route');

var app = express();
app.locals.users = {};
app.locals.tokens = 0;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.logger('dev')); // This line is what turns on the server logger in the terminal.

//The following is what sets the port of your local app, feel free to change that if needed.
app.use('/users', users);
app.use('/cakes', cakes);
app.use('/', route);
app.set('port', process.env.PORT || 3000);

//-------------------------------------------------------------------------------------------------------------------

// error handler
app.use(function(err, req, res) {
    // render the error page
    if (res.headersSent) {
        return next(err);
    }
    res.sendStatus(403).send({ error: err });
});

app.listen(3000, function() {
    console.log('I am listening on localhost:3000');
    // server is open and listening on port 3000, to access: localhost:3000 in any browser.
});

module.exports = app;
