// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// api timestamp microservice
app.get("/api/timestamp/:datestring", (req, res, next) => {
  
  // Checks for valid date yyyy-mm-dd format
  const validDateReg = /^[\d]{4}-[\d]{2}-[\d]{2}/g
  
  const date = req.params.datestring
  let newDate = {};
  
  // Valid Date
  if(validDateReg.test(date)){
    
    const d = date.split("-");
    const nDate = new Date(parseInt(d[0]), d[1] -1, d[2], 0 , 0 , 0 , 0);
    newDate = {
      unix: nDate.getTime(),
      utc: nDate.toUTCString()
    }
  }
  
  // Valid unix time
  else if(!isNaN(parseInt(date))){
    newDate = {
      unix: (new Date(parseInt(date))).getTime(),
      utc: (new Date(parseInt(date))).toUTCString()
    }
  }
  
  // Invalid time
  else{
    newDate = {
      error : "Invalid Date" 
    }
  }

  res.json(newDate);
})

// api timestamp microservice for empty date string handling
app.get("/api/timestamp/", (req, res, next) => {

  const curDate = new Date();
  res.json({
    unix: curDate.getTime(),
    utc: curDate.toUTCString()
    
  })
})