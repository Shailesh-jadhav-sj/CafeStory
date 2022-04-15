const express = require('express');
const mongoose = require('mongoose');

require("dotenv").config();

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/item');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const app = express();
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', itemRoutes);
app.use('/api', cartRoutes);
app.use('/order', orderRoutes);


// ---------------------------------
const path = require("path");
const static_path=path.join(__dirname,"public");
app.use(express.static(static_path));
app.set("view engine","hbs");


app.get("/",(req,res)=>{
  res.render("index");
});

app.get("/login",(req,res)=>{
  res.render("login");
});

app.get("/signup",(req,res)=>{
  res.render("signup");
});


app.get("/logout",(req,res)=>{
  res.render("logout");
});


app.get("/purchase",(req,res)=>{
  res.render("purchase");
});

app.get("/reservation",(req,res)=>{
  res.render("reservation");
});


//--------------------------------

console.log(static_path);
const dbURI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => 
  console.log(`Server running on http://localhost:${port}`)))
  .catch((err) => console.log(err));