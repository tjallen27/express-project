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
    db = client.db("blackout-test");
    app.listen(process.env.PORT || port);
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
        amount: 1999,
        currency: "gbp",
        source: token
      })
      // when the payment is successful, download the file locally
      // so we can use it on the success page

      .then(() => {
        Promise.resolve()
          .then(() => {
            return new Promise(resolve => {
              console.log("Started download");
              console.log(req.body.total_source);

              download(req.body.total_source, "public/assets").then(() => {
                console.log("downloaded!");
                resolve();
              });
            });
          })
          .then(() => {
            console.log("success page rendered");
            res.render("success", {
              song_link: req.body.total_source.substring(
                req.body.total_source.lastIndexOf("/") + 1,
                req.body.total_source.length
              ),
              song_source: req.body.total_source,
              name: req.body.name,
              tags: req.body.tags
            });
          });
      })
      .catch(err);
  })();
});
