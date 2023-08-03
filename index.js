// npm init -y = create package.json file 
// npm i express  = install express framework 
// npm i nodemon  = install nodemon package 
// package.json -> scripts -> "start" : "nodemon index.js"
// create index.js file
// that 4 step into index.js file
// import express 
// create instance 
// define routes 
// use listen function 

import express from 'express';
const app = express();
// frontend to backend - request - req  -- asking for mens shirt
// backend to frontend - response - res  -- return mens shirt
app.get("/", function(req, res){
    res.send("Welcome to backend")
});
app.get("/login", function(req, res){
    res.send("Swaaraj")
});
app.get("/awdiz", function(req, res){
    res.send("awdiz")
});
app.listen(8000,()=>{
    console.log("Server listening on port 8000");
})  