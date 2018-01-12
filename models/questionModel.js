var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var AutoIncrement = require('mongoose-sequence');
var questionSchema=new Schema({
    question:String,
	type:String,
	options:[],
	answer:String
})

questionSchema.plugin(AutoIncrement,{inc_field: 'id'});
var Question=mongoose.model('Question',questionSchema);


mongoose.model('counter', new Schema({id:String,seq:Number}));

var counters = mongoose.model('counter');
// counters.find(function(err,count){
//                                 if(err){
//                                 	    console.log(err);
//                                  }
// 	else{
// 	console.log(count)
// 	}
// })

module.exports={Question:Question,counters:counters};
