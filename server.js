require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const productRoute = require("./routes/productRoute");
const authRoutes = require('./routes/authRoute')
const passportConfig = require('./middleware/passportConfig')
const cors = require('cors')
const app = express();

//
passportConfig(passport);

const allowedLinks = ["http://localhost:5173"]

const corsOptions = {
  origin: function (origin, callback){
    if(allowedLinks.indexOf(origin) !== -1 || !origin){
      callback(null, true)
    }else{
      callback(new Error('CORS violation'))
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
}

// middle ware
app.use(cors(corsOptions))
app.use(express.json());
app.use(passport.initialize())

app.use((req, res, next)=>{
  console.log(req.path, req.method)
  next()
})


// routes
app.use("/api/products", productRoute);
app.use('/api/auth', authRoutes)

// Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("app running on PORT 3000");
    });
  })
  .catch((error) => {
    console.log("the error", error);
  });
