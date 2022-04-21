const express = require('express');
const mongoose = require('mongoose');
const multer =  require('multer');
const path = require("path");
const Razorpay = require('razorpay'); 
var bodyParser = require('body-parser');

require("dotenv").config();
const razorpayInstance = new Razorpay({
  
  // Replace with your key_id
  key_id: process.env.key_id,

  // Replace with your key_secret
  key_secret: process.env.key_secret
});

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'./public/images')
  },
  filename: (req,file,cb)=>{
    console.log(file);
    cb(null,(Date.now() + path.extname(file.originalname)))
  },
})
const upload = multer({storage: storage}); 


const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/item');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const reservRoutes = require('./routes/Reserv');




const app = express();
app.use(express.json());

app.use(bodyParser.json(),bodyParser.urlencoded({ extended: true }));
app.post('/createOrder', (req, res)=>{ 
  
  // STEP 1:
  const {amount,currency,receipt, notes}  = req.body;      
        
  // STEP 2:    
  razorpayInstance.orders.create({amount, currency, receipt, notes}, 
      (err, order)=>{
        
        //STEP 3 & 4: 
        if(!err)
         { console.log("order"+order);
          res.json(order)}
        else
          res.send(err);
      }
  )
});

app.use('/api', authRoutes);
app.use('/api', itemRoutes);
app.use('/api', cartRoutes);
app.use('/order', orderRoutes);
app.use('/reserv',reservRoutes);


// ---------------------------------

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

app.get("/cart",(req,res)=>{
  res.render("cart");
});

app.get("/orders",(req,res)=>{
  res.render("orders");
});

app.get("/add_products",(req,res)=>{
  res.render("add_products");
})

app.get("/view_bill",(req,res)=>{
  res.render("view_bill");
})
//--------------------------------

console.log(static_path);
const dbURI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => 
  console.log(`Server running on http://localhost:${port}`)))
  .catch((err) => console.log(err));

  