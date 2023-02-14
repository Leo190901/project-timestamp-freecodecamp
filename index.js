// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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



app.get("/api/:date?", (req, res) => {
  console.log(req.params.date);
  let date, date1, date2;
  let timeStamp, timeStamp1, timeStamp2;
  const regex = /\d+/;
  WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  if(req.params.date == undefined) {
    date = new Date(Date.now());
    day = date.getDay();
    month = date.getMonth();
    year = date.getFullYear();
    dayOfMonth = String(date.getDate()).padStart(2, '0');
    seconds = String(date.getUTCSeconds()).padStart(2, '0');
    minutes = String(date.getUTCMinutes()).padStart(2, '0');
    hours = String(date.getUTCHours()).padStart(2, '0');
    res.json({unix: Date.now(), utc: `${WeekDays[day]}, ${dayOfMonth} ${Months[month]} ${year} ${hours}:${minutes}:${seconds} GMT` })
  }


  if (new Date(req.params.date)) {

    //for number
    timeStamp1 = Number(req.params.date);
    date1 = new Date(timeStamp1);

    //for date
    date2 = new Date(req.params.date);
    timeStamp2 = date2.getTime();

    if(isNaN(timeStamp1)){
      timeStamp = timeStamp2;
      date = date2;
    } else{
      timeStamp = timeStamp1;
      date = date1;
    }

    console.log(date1)
    console.log(timeStamp1)
    console.log(date2)
    console.log(timeStamp2)
    
    
  }

  if(isNaN(timeStamp)){
    res.json({ error: "Invalid Date" });
  }
  
  
  
  day = date.getDay();
  month = date.getMonth();
  year = date.getFullYear();
  dayOfMonth = String(date.getDate()).padStart(2, '0');
  seconds = String(date.getUTCSeconds()).padStart(2, '0');
  minutes = String(date.getUTCMinutes()).padStart(2, '0');
  hours = String(date.getUTCHours()).padStart(2, '0');

  console.log(date);
  res.json({ unix: timeStamp, utc: `${WeekDays[day]}, ${dayOfMonth} ${Months[month]} ${year} ${hours}:${minutes}:${seconds} GMT` });
  
})




let port = process.env.PORT || 3000;
// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
