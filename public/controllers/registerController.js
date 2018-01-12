angular.module('myApp', []).controller('formCtrl', function($scope,$http) {
$scope.role=["user","admin"];

$scope.submit=function(){
	 $http.post("/",$scope.user)
    .then(function() {
        
    },
     function(response){
$scope.message=response.statusText;
     });
}

});
