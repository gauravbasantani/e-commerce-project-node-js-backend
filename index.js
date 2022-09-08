let express = require("express");
let mongoose = require("mongoose");
let bodyparser = require("body-parser");

let app = express();
app.use(bodyparser.json({limit:'50mb'}));
app.use(bodyparser.urlencoded({limit:'50mb', extended: true}));


app.use(express.static("assets"));
app.use(express.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if(req.method == "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

mongoose.connect("mongodb+srv://gaurav:Ganesh@1228@gauravcluster.guvu1tg.mongodb.net/ecommerce");
let db = mongoose.connection;
db.on("error", error=> console.log(error));
db.on("open", ()=> console.log("Connection Established"));


app.get("/", function(req, res){
    res.send("Welcome to E-Commerce Back End");
    res.end();
});
const PORT = process.env.PORT || 3000
app.use("/admin", require("./routes/admin"));
app.use("/productcategory", require("./routes/productcategory"));
app.use("/product", require("./routes/product"));
app.use("/user", require("./routes/user"));
app.use("/order", require("./routes/order"));

app.listen(PORT, function(){
    console.log("Back End running on http://localhost:8081/");
});
