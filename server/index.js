const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require("./routes/auth")

require('dotenv').config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//connect to mongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("connected to mongoDB")
    })
    .catch((err) => {
        console.log("mongoDB connection error:", err)
    })

// routes
app.use('/api/auth',authRoute);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});