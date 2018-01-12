var mongoose=require('mongoose');
var db=mongoose.connect("mongodb://localhost/examDb4",{useMongoClient: true,});
var Schema=mongoose.Schema;


var AutoIncrement = require('mongoose-sequence');

var registrationSchema=new Schema({
_id:Number,
name:String,
password:String,
role:String


},{ _id: false });

registrationSchema.plugin(AutoIncrement);




var Registration=mongoose.model('Registration',registrationSchema);


module.exports = {Registration:Registration};

