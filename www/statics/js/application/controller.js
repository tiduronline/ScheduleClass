/**
 *	Main Controller
 *
 *	@author Verri Andriawan < verri@tiduronline.com >
 *	@copyright 24 Oct 2014
 */
'use strict'


Schedule.controller('MainController', ['$scope', '$interval', 'requestService', function( $scope, $interval, reqServ ){


	$scope.hideMobile = function(index){

		var klass = '';
		var midHide = [2,4,7,8,9];
		var xsHide = [2,3,4,7,8,9];
		var lgHide = [5,9];

		
		if(jQuery.inArray(index, midHide) > -1)  	{ 	klass += 'hidden-md hidden-sm '; }
		if(jQuery.inArray(index, xsHide) > -1) 		{ 	klass += 'hidden-xs '; }
		if(jQuery.inArray(index, lgHide) > -1) 		{ 	klass += 'hidden-lg '; }
		

		return klass;
	}

	$scope.updateData = function(){
		var timestamp = new Date().getTime();
		// Get data From URL
		reqServ.scheduleReq(
			'/jadwal/www/get.json?'+timestamp,

			// check if Success
			function(data){

				$scope.tbHeaders = data['headers'];
				$scope.tbItems = data['datas'];
				$scope.tbDate = data['date'];

				var date = data['date'].split(' ')
				$scope.tbDate = []
				$scope.tbDate['d'] = date[0]
				$scope.tbDate['m'] = date[1]
				$scope.tbDate['y'] = date[2]
				$scope.tbTime = data['time'];

				data = null;
			},



			// check if Error
			function(data){

				//  Error Form

			}
		);
	}

	$scope.updateData();

	// var realtime = $interval(function(){
	// 	$scope.updateData();
	// }, 20000);

}]);
