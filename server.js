// import required modules/packages
const express = require("express");
const http = require("http");

// port number to listen to
const port = 3000;

// app instance
const app = express();

// app configurations

// app endpoints
app.get("/test", function(request, response){
    response.send("Test route working");
});

app.get("/", (req, res)=>{
    res.send("Welcome home, Dev");
});

// server instance
const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`);
});