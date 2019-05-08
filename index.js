const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
app=express()

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());



app.use("/api/login", require("./routes/login.js"));
app.use("/api/colinha", require("./routes/colinha.js"));
app.use("/api/avaliacao", require("./routes/avaliacao.js"));


app.use(express.static('static'));


mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.db, {useNewUrlParser: true}, (err, db)=>{
    if(err){
        console.error("Error connecting to MongoDB: ", err);
        process.exit(1);
    }
    console.log("Connected to MongoDB");
});


app.listen(process.env.PORT, function(){
    console.log(`Server Started on PORT:${process.env.PORT}`)
})
