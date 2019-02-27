const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { stripeSecretKey, stripePublishableKey } = require('./config/environment');
const stripe = require('stripe')(stripeSecretKey);
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// dummy data
const db = [
  {
    _id: 1,
    name: 'Song One',
    img: 'image_url',
    demo_source: 'abc',
    total_source: 'abcdef',
    description: 'Song description',
    price: 499
  },{
    _id: 2,
    name: 'Song Two',
    img: 'image_url',
    demo_source: 'abc',
    total_source: 'abcdef',
    description: 'Song description',
    price: 499
  },{
    _id: 3,
    name: 'Song Three',
    img: 'image_url',
    demo_source: 'abc',
    total_source: 'abcdef',
    description: 'Song description',
    price: 499
  }
];

// set up ejs as view engine
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

// allow public folders to be accessed
app.use(express.static(`${__dirname}/public`));

// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// pass in data to index rendering
app.get('/', (req, res) => {
  res.render('index',
    { songs: db }
  );
});

app.post('/charge', (req, res) => {
  const stripeToken = req.body.stripeToken;
  const email = req.body.stripeEmail;

  stripe.customers.create({
    email: email,
    source: stripeToken
  })
    .then(charge => res.render('success'));
});

// fire up the server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
