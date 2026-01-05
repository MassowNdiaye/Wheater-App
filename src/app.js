const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { title } = require("process");

// console.log(__dirname); //This allow me to see the directory path
// console.log(path.join(__dirname, "../public")); //The .. allows me to exit from the directory and access another directory dinamically

const app = express();

//Setting Paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setting views locations
app.set("view engine", "hbs"); //Allow to set up handlebar
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index"); //res -> Render -> index (index.hbs)
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You need to provide an adress!",
    });
  }

  //This ready units from string
  const units = req.query.units || "metric";

  geocode(req.query.address, (error, geoData) => {
    if (error) {
      return res.send({ error });
    }

    forecast(
      geoData.latitude,
      geoData.longitude,
      units,
      (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location: geoData.location,
          address: req.query.address,
        });
      }
    );
  });
});

app.use((req, res) => {
  res.status(404).send("404 - Page");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
