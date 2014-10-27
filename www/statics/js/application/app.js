/**
 *	Main Application
 *
 *	@author Verri Andriawan < verri@tiduronline.com >
 *	@copyright 24 Oct 2014
 */
 'use strict'

 

var Schedule = angular.module('Schedule', [ 'ngRoute','ngResource' ])


	.config([ '$routeProvider', '$locationProvider',
		function( $routeProvider, $locationProvider ) {
			$routeProvider


			/**
			 *	Root URL
			 */

			.when('/', { 
				templateUrl : '/jadwal/www/statics/js/tmpl/main.html',
				controller : 'MainController'
			})

			


			.otherwise({ redirectTo: '/' });


			$locationProvider.html5Mode(true).hashPrefix('#');
		}
	]);

	
