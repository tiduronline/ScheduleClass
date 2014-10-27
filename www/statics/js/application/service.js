/**
 *	Main Service
 *
 *	@author Verri Andriawan < verri@tiduronline.com >
 *	@copyright 24 Oct 2014
 */
'use strict'


Schedule.service( 'requestService', [ '$http', function($http) {



	/**
	 *	Schedule Request Service
	 *	
	 *	@param url
	 *	@param SuccessCall 
	 *	@param ErrorCall
	 */
	 
	this.scheduleReq = function( url,SuccessCall,ErrorCall ) {
		
		// $http.jsonp( url )
		var config = {};
		config.url = url;
		config.method = 'GET';
		config.headers = {
			"Accept" : "Application/json", 
		}



		$http(config)


		// Resturn this if Success
		.success(function(data, status){
			if( typeof(SuccessCall) === 'function' )
				return SuccessCall(data);
		})


		// Return this if Error
		.error(function(data, status){
			if( typeof(ErrorCall) === 'function' )
				return ErrorCall(data);
		});
	}

}]);