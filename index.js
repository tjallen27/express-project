const express = require("express");

const expressLayouts = require("express-ejs-layouts");
const {
  stripePublishableKey,
  stripeSecretKey
} = require("./config/environment");
const bodyParser = require("body-parser");
const fs = require("fs");
const https = require("https");
const download = require("download");
const request = require("request");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const port = 8080;
let db;
MongoClient.connect(
  "mongodb://tjallen27:3crdwfkk@ds155045.mlab.com:55045/blackout-test",
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("blackout-test"); // whatever your database name is
    // fire up the server
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  }
);

// set up ejs as view engine
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.use(expressLayouts);

// allow public folders to be accessed
app.use(express.static(`${__dirname}/public`));

// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// pass in data to index rendering
app.get("/", (req, res) => {
  db.collection("tracks")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      // renders index.ejs
      res.render("index", { tracks: result });
    });
});

// create the stripe charge
var stripe = require("stripe")(stripeSecretKey);
app.post("/charge", (req, res) => {
  const token = req.body.stripeToken;
  const email = req.body.stripeEmail;

  console.log(req.body);
  (async err => {
    const charge = await stripe.charges
      .create({
        amount: 999,
        currency: "gbp",
        source: token
      })
      // when the payment is successful, download the file locally
      // so we can use it on the success page
      .then(() => {
        download(req.body.total_source, "dist").then(() => {
          console.log("done!");
        });
      })
      // then render the success page
      .then(
        res.render("success", {
          song_source: req.body.total_source,
          name: req.body.name
        })
      )
      .catch(err);
  })();
});
