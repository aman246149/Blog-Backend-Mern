const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');


//import routers
const authRoute = require("./routes/auth");
const postRoute=require("./routes/blogs/postBlogData")
dotenv.config();

//connect to Db

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
() => console.log("connected to db")
);

//middleware to parse postt request

app.use(express.json())

// to avoid cors errors
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
      'auth-token'
    ],
  };
  
  app.use(cors(corsOpts))


  //routes

  app.use("/api/user", authRoute);
  app.use("/blog",postRoute)

app.listen(3000, () => console.log("server is running at port 3000"));
