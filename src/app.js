const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./api')

const app = express();

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB || 'mongodb://localhost/blog-app', { useNewUrlParser: true }, (error)=>{
    if(error)   
        console.log(error)
    else
        console.log("Mongodb Connected")
});

app.use("/api",routes)

let port = process.env.PORT || 5000

app.listen(port,(error)=>{
    if(error)
        console.log(error)
    else    
        console.log("Started listening at ", port)
})