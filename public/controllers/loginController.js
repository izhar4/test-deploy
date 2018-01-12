angular.module('myApp', []).controller('formCtrl', function($scope,$http) {
	$scope.submit=function(){
	if($scope.user.name && $scope.user.password){
$http.get("/validateUser",{params:{name:$scope.user.name,password:$scope.user.password}}).then(function (response) {
       $scope.message = response.data;
    },function myError(response) {
        $scope.message = response.data;
    });
}
else
{
	$scope.message="please enter name and password";
}

}
});
