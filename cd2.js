var express = require('express');
var app = express();
var fs = require('fs');
var https = require('https');

var path = require('path'),
    methods = require('methods'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');
'use strict'
const status = require('http-status')

var key = fs.readFileSync('/Users/GermanMtz/dblitz/germanlocalhost.key');
var cert = fs.readFileSync( '/Users/GermanMtz/dblitz/germanlocalhost.crt' );

var options = {
  key: key,
  cert: cert
};

var request = require("request")

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

app.get("/coindifficulty", function (req, res) {

    var theUrl = 'https://www.coinwarz.com/v1/api/profitability/?apikey=585c543b04da4ac984e0b466c52626e4&algo=all'
    request(theUrl, function (error, response, body) {
      
          console.log('body:', body); 
          res.send(body)
    });
 //       (async () => {
  //  try {
  //    const response = await got('https://www.coinwarz.com/v1/api/profitability/?apikey=585c543b04da4ac984e0b466c52626e4&algo=all');
  //    console.log(response.body);
  //    res.send(response.body)
  //    //=> '<!doctype html> ...'
  //  } catch (error) {
  //    console.log(error.response.body);
  //    //=> 'Internal server error ...'
  //  }
  // })();

      });








https.createServer(options, app).listen(3000);


//openssl x509 -req -days 365 -in germanlocalhost.csr -signkey germanlocalhost.key -out germanlocalhost.crt