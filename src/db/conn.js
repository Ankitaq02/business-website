const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/mystructure");

const SeopleSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const PeopleId=mongoose.model("PeopleId",SeopleSchema);

var anki=new PeopleId({name:'anki'});

anki.save(function(err,anki){
    if(err)return console.error(err);
})
module.exports=PeopleId;