
const express = require('express');
const mongoose = require('mongoose');
var app = express();
app.set('view engine', 'ejs')
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
// mongoose.connect("mongodb://localhost:27017/blog",{
//     useNewUrlParser:true,useUnifiedTopology: true
// },(err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("database connected");
//     }
//     // var dbo = db.db("blog");
//     // // dbo.collection("quotes").find({}).toArray(function(err,result){
//     // //     if(err) throw err;
//     // //     console.log(result);
//     // //     db.close();
//     // });
// });
// var url = "mongodb://localhost:27017/blog";
// mongoose.connect(url, function(err,db){
//     if(err) throw err;
//     console.log("connected to database")
//     // var dbo = db.db("blog");
//     // dbo.collection(quotes).find({}).toArray(function(err,result){
//     //     if(err) throw err;
//     //     console.log(result);
//     //     db.close();
//     // });
// });

var url = "mongodb://localhost:27017/";
MongoClient.connect(url,function(err,db){
    if(err) throw err;
    console.log("mongo connected");
    // var dbo = db.db("blog");
    // dbo.collection("quotes").find({}).toArray((err,result)=>{
    //     if(err) throw err;
    //     console.log(result);
    // })
    router.get("/", function(req,res){
        var dbo = db.db("blog");
        dbo.collection("quotes").find({}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            // console.log(result);
            db.close();
        })
        // dbo.collection("quotes").find({"title":"test"}).toArray((err,result)=>{
        //     if(err) throw err;
        //     res.send(result);
        // })
        router.delete("/data/:id",function(req,res){
            const id = req.params.id;
            const id2 = req.params.id;
            console.log(id2)
        })
    })
    
})
module.exports = router;