(function(){

    'use strict';

    var AppController = angular.module('AppController',['DataServices']);

    AppController.controller('AppController',['$scope','DataServices',function($scope,DataServices){

        console.log('AppController');


        $scope.w = "hola";
    }]);


})();