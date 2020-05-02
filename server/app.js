const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const app = express();
dotenv.config();
const middlewares = require("./middlewares/middlewares")

//connect to database
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console,"connection error"));
db.once('open', ()=>{console.log("we are connected")})

//routes registration
const authRoute = require('./routes/auth')
app.use("/user/registration", authRoute)

//homepage
app.get('/', (req, res) => {
    res.json({ message: "Home Page" })
})

//Not Found 
app.use(middlewares.notFound);
//error handeler
app.use(middlewares.erroHandeler);

//server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server listening at port: ${port}`)
})
