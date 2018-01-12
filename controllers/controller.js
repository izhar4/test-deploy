var path=require('path');
var express=require('express');
var app=express();
const querystring = require('querystring');
var Registration=require('./../models/registrationModel').Registration;
var Question=require('./../models/questionModel').Question;
var counters=require('./../models/questionModel').counters;



// demo function
var sayHello = function(req, res) {
  console.log('hello user');
  res.send('hello user');
}
//register users
var saveUsers=function(req,res){
  var register=new Registration({name:req.body.name,password:req.body.password,role:req.body.role})
    register.save(function(err){
      if(err){
        res.status(500).send("could not save");
      }
      else{

        res.redirect('/login');
      }
  })
}

//redirect to loginpage
var loginPage=function(req,res){ 
  res.sendFile(path.join(__dirname,'./../public/userLogin.html'));
}


//validate the user
var userValidate=function(req,res){
 var name=req.param('name');
  var password=req.param('password');
  

    Registration.find(function(err,users){
      if(!err){
       var count=0;
       var j;
        for(var i=0;i<users.length;i++){
          if(name==users[i].name && password==users[i].password){
            count++;
            j=i;
            break;
          }
          
        }
          if(count){
            if(users[j].role=="user"){
              res.redirect('/userPage');
            }
            else if(users[j].role=="admin"){
              res.redirect('/adminPage'); 
            
            }
          }
          else{
            res.status(403).send("incorrect name or password");
          }
      }   
          else{
            res.status(500).send("internal server error");
          }
   })
}


//load user page
var userPage=function(req,res){
 res.sendFile(path.join(__dirname + './../public/userPage.html'));
}

//load adminpage
var adminPage=function(req,res){
 res.sendFile(path.join(__dirname + './../public/adminPage.html'));
}


//save questions to db
var saveQuestions=function(req,res){ 
   var data=req.body;
   
  /* var data='';
     for(x in a){
       data=JSON.parse(x)
      }*/
     for(var i=0;i<data.length;i++){
       var question=new Question(data[i]);
       question.save(function(err){
          if(!err){
              res.status(200);
          }
          else{
            res.status(500).send("questions are not saved");
          }
       })
      }
      res.redirect("/loadQuestions");
    //res.redirect("/adminPage");
}



//load questions from db
var loadQuestions=function(req,res){
    Question.find(function(err,question){
      if(!err){
        res.json(question);
      }
      else{
        res.status(500).send("questions not found");
      }
    })
}

// delete questions
var deleteQuestions=function(req,res){
  var id=req.param('id');
var delId=parseInt(id)


  
   
    Question.remove({id:id},function(err){
      if(!err){
        Question.find(function(err,question){
           var size=question.length;
             for(var i=delId+1;i<=size+1;i++){
                Question.findOne({id:i},function(err,question){
                 var id1=question.id;
                 id1=id1-1;
                 question.id=id1;
                 question.save();
                })
              }
                counters.findOne({id:"id"},function(err,count){

                 count.seq=size;
                 count.save();
                })
         });
            
           res.status(200).send("deleted")
            //res.send((JSON.stringify(delId)));
       }  
       else{
        res.status(500).send("cannot be deleted");
       }                         //if closed
   });
     
    
  
}


//update questions
var updateQuestions=function(req,res){
  var data=req.body;
   

      if(data){
                  
        var id=data.id;
          Question.update({id:id},{$set:{question:data.question,type:data.type,options:data.options,answer:data.answer}},function(err){ 
                 if(!err){
                   Question.findOne({id:id},function(err,question){
                       res.json(question);
                   })
                  }
                 else{
                   res.send(500).send("internal server error");
                  }
                  
                 
                 
          }) 

      }
      else{
        res.status(400).send("req data is not valid");
      }
    
}


var getFormData = function(req, res){

}



module.exports={
saveUsers:saveUsers,
loginPage:loginPage,
userValidate:userValidate,
userPage:userPage,
adminPage:adminPage,
saveQuestions:saveQuestions,
loadQuestions:loadQuestions,
deleteQuestions:deleteQuestions,
updateQuestions:updateQuestions,
getFormData:getFormData,
sayHello:sayHello

};
