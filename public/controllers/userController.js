angular.module('myApp', []).controller('myCtrl', function($scope,$http) {
 
 $scope.current=0;
$scope.questionsList=[];
$scope.counter=0;
var previous=0;
function display(){
	$http.get("/loadQuestions").then(function (response) {
       $scope.questionsList=response.data;
       console.log($scope.questionsList)
       $scope.size=$scope.questionsList.length;
       
    },function myError(response) {
        
    });
}

$scope.startTest=function(){
	$scope.a=1;
	display();
	
	console.log($scope.size)

}

$scope.next=function(){
	marks();
	$scope.user.option="";
$scope.current++;
}
 
$scope.prev=function(){
	previous++;
	$scope.current--;
	if($scope.counter>0){
	   if(previous==1){
		$scope.counter=$scope.counter-2;
	   }
	   else{
		$scope.counter=$scope.counter-1;
	   }
    }

}

function marks(){
	if($scope.questionsList[$scope.current].type=="single choice"){
		console.log($scope.user.option)
		var answer=$scope.questionsList[$scope.current].answer;
		if(answer==$scope.user.option){
             $scope.counter++;
		}

	}
	else if($scope.questionsList[$scope.current].type=="multi choice"){
		var str=$scope.questionsList[$scope.current].answer;
		var arr=str.split(",");
		var answer1=arr[0];
		var answer2=arr[1];
		
		var a=[];
		for(var i in $scope.options)
		{
			a.push(i);
		}
		/*if($scope.options.x=="true" && $scope.options.y=="true")
		{
			console.log("true");

		}*/
		var option1=a[0];
		var option2=a[1];
		if(((answer1==option1)||(answer1==option2))&&((answer2==option1)||(answer2==option2)))
		{
                $scope.counter++;
		}
		
		$scope.options={};
        
    }
}

/*$scope.changeValue = function(value){
    console.log(value.option);
  }*/
  $scope.submit=function(){
  	marks();
  	localStorage.setItem("count",$scope.counter);
  	window.location="/resultPage.html";

  	
  }

});