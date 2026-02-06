const express = require('express');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const foodRoutes = require('./routes/food.routes')
const foodPartnerRoutes = require('./routes/food-partner.routes')
const cors = require('cors')


const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://food-reels-mern-frontend.onrender.com"
  ],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json()); //this middleware brings data into req.body and makes it readable so that we can work upon it [req.body in auth.controllers.js]

app.get("/" , (req , res) => {
  res.send("Hello World");
})

app.use('/api/auth' , authRoutes);
app.use('/api/food' , foodRoutes);
app.use('/api/food-partner' , foodPartnerRoutes);

module.exports = app;  