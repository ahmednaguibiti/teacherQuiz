// packages
let express = require("express"),
    path = require("path"),
    mongoose = require("mongoose"),
    session = require("express-session"),
    flash = require("connect-flash");



let server = express();



// connecting to database
mongoose.connect("mongodb+srv://ahmed:12345@cluster0-ns3zc.mongodb.net/test?retryWrites=true&w=majority")
.then(result => {
    console.log("connected");
}).catch(err => {
    console.log(err);
});

// using flash Message
server.use(flash());


// configure session
server.use(session({secret: "my secret key",resave: false,saveUninitialized: false}));


//body parser
const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());



// required routes
const userRoute = require("./routes/userRoute");
const teacherRoute = require("./routes/quizRoute");


// template engine
server.set("view engine","ejs");
server.set("views",path.join(__dirname,"views"));


// static files
server.use(express.static(path.join(__dirname,"node_modules","bootstrap","dist")));
server.use(express.static(path.join(__dirname,"public")));



// middleware

// routes for user controller
server.use("/user",userRoute);

server.use((request,response,next)=>{
    if(request.session.loggedIn){
        next();
    }else{
        response.redirect("/user/login");
    }
})
// routes for teacher controller
server.use("/teacher",teacherRoute);

server.use((request,response) => {
    response.redirect("/user/login");
});






// run server : port 3000
// server.listen(3000);
server.listen(process.env.PORT || 3000, function(){
    console.log('listening on');
});
