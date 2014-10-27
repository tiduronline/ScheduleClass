/**
 *	Main Application
 *
 *	@author Verri Andriawan < verri@tiduronline.com >
 *	@copyright 24 Oct 2014
 */
 'use strict'

 

var Schedule = angular.module('Schedule', ['ngRoute', 'ngResource'])


	.config([ '$routeProvider', 
		function( $routeProvider ) {
			$routeProvider


			/**
			 *	Root URL
			 */

			.when('/', { 
				templateUrl : '/statics/js/tmpl/main.html',
				controller : 'MainController'
			})

			.otherwise({ redirectTo: '/' });
		}
	]);

	