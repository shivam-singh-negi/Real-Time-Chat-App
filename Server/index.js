const express = require("express");
const cors = require('cors');
const mongoose=require("mongoose");
const userRoute=require("./Routes/userRoute.js")
const chatRoute=require("./Routes/chatRoute.js")

const app = express();
require("dotenv").config()

app.use(express.json());
app.use(cors( {
  origin: '*',
  methods:["GET","POST","PUT","DELETE"]
}));


app.use("/api/users",userRoute);
app.use("/api/chats",chatRoute);



const Port = process.env.Port||5000;
const URI= process.env.DB_URI;
app.listen(Port, () => {
  console.log(`Welcome to the Backend! The server is now live and listening at port ${Port}`);
});

mongoose.connect(URI)
.then(()=>{console.log("Successfully connected with the MongoDb")})
.catch((error)=>{console.log("Something went wrong. Failed to connected with MongoDb ",error.message)});