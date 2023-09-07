require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const lo = require("lodash");
const mongoose = require("mongoose");
const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URL);

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/public/main/index.html");
});

app.post("/", function(req,res) {

  const name = lo.upperFirst(req.body.name);

  //Making API Call
  const apiKey = "cb23980b9281dc8584036604fd1d47b6";
  const unit = "metric";
  url = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {

    response.on("data",function(data) {

      //This will turn the data in json formate and
      //then we parse it to convert it in javascript object.
      const Wdata = JSON.parse(data);

      const temperature = Wdata.main.temp;
      const description = lo.upperFirst(Wdata.weather[0].description);
      const humidity = Wdata.main.humidity;
      const windSpeed = Wdata.wind.speed;
      const pressure = Wdata.main.pressure;

      //Getting the image of weather condition.
      const icon = Wdata.weather[0].icon;

      //We are fetching the live data from open weather server.
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.render("weatherDetails", {cityName : name, temp: temperature,
        des: description, hum: humidity, speed: windSpeed, press: pressure, imgUrl : imageurl});
    });
  });

});

app.post("/signup", function(req,res) {

  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const personSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      email: String
  });

  const People = mongoose.model("People", personSchema);


  const person = new People({
    firstName: firstName,
    lastName: lastName,
    email: email
  });

  person.save();

  res.redirect("/");
});

app.listen(port, function(req,res) {
  console.log("Server is running");
});
