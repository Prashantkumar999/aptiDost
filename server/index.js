import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app = express();

//middlewares
app.use(express.json());
app.use(cors())

//test route 
app.get('/',(req,res)=>{
    res.send("hello ji")
});

app.listen(5000,()=>{
    console.log("server is running at 5000")
})