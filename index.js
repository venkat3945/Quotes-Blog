const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongo = require('./mongo.js');
var router = express.Router();
var app = express();
const methodoverride = require('method-override');
app.set('view engine', 'ejs')
app.use(methodoverride('_method'))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/" + "index.html")
});
app.get('/new', (req,res)=>{
    res.sendFile(__dirname + "/" + "new.html")
});
mongoose.connect("mongodb://localhost:27017/blog",{
    useNewUrlParser:true,useUnifiedTopology: true
},(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("database connected");
    }
});

var conn = mongoose.connection;
var schema = new mongoose.Schema({
    title: String,
    description: String,
    markdown: String
})
var model = mongoose.model('quote',schema)
var newarticle =model.find({});
app.post("/", (req,res)=>{
    var userquote = new model({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    userquote.save(function(err,reql){
        if(err) throw err;
        newarticle.exec(function(err,data){
            if(err) throw err;
            else{
                console.log("records inserted successfully");
            }
        })
        res.redirect("/");
    })
    // var title = req.body.title;
    // var description = req.body.description;
    // var markdown = req.body.markdown;

    // var data = {
    //     "title" : title,
    //     "description": description,
    //     "markdown": markdown
    // };
    // console.log(data);
    // res.end(JSON.stringify(data));
})
app.use("/mongo",mongo);
// app.get('/details',(req,res)=>{
//     model.find({}, function(err,quotes){
//         res.render('test.ejs',{
//             allquotes: quotes
//         });
//     })
// })
// app.use("/",mongo);
app.get("/data",(req,res)=>{
    model.find({},function(err,quotes){
        res.render('test.ejs',{
            quoteslist: quotes
        })
    })
})
router.delete('/data/:id', function(req,res){
    model.findByIdAndDelete(req.params.id)
})
app.listen(4000);