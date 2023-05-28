// import required modules/packages
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");

// configuring database connection
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/express-js-basic-fundamentals").then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log("Failed to connect to database", err);
});

// port number to listen to
const port = 3000;

// app instance
const app = express();

// app configurations

// commented this, since i have already setup routes from another directory
// // app endpoints
// app.get("/test", function(request, response){
//     response.send("Test route working");
// });

// app.get("/", (req, res)=>{
//     res.send("Welcome home, Dev ");
// });

// server instance
const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`);
});