require("dotenv").config();
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require('method-override');
const app = express();
const PORT = 5000 || process.env.PORT;





const connectDB = require('./server/config/db');
const cookieParser = require("cookie-parser");
const MongoStore = require('connect-mongo');



app.use(express.static('public'));



// Connect to DB
connectDB();



app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));




//Templatong Engine

app.use(expressLayout);
app.set("layout", "./layouts/main"); // this tells us the directory from where to render pages
app.set("view engine", "ejs");// this is deciding which rendering engine are we using

app.use("/", require("./server/routes/main"));// we set this to redirect our main get request from the directory we wanted 
//this main page will act as skeleton page for us which set basic design for the other pages including the index

app.use("/", require("./server/routes/admin"));
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
