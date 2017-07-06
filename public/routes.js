(function () {

    'use strict';


    var HtPageSpeed = angular.module("HtPageSpeed",["ngRoute","angular-loading-bar","AppController","GooglePageSpeedController","DataServices"])

    HtPageSpeed.config(function($routeProvider,cfpLoadingBarProvider){

        cfpLoadingBarProvider.includeSpinner = true;
        // cfpLoadingBarProvider.parentSelector = '#loading_bar';
        // cfpLoadingBarProvider.spinnerTemplate = '<div class="loading_bar_container"><span style="text-align: center; margin-left: 150px; margin-top: 20px;    text-align: center;margin-left: 176px;margin-top: 45px;padding: 10px;font-size: 10px;">LOADING</span><div style="margin-left: 80px;" class="loader8"></div></div>';
        // cfpLoadingBarProvider.includeBackdrop = true;

        $routeProvider
            .when("/", {
                templateUrl : "pages/google_page_speed.html",
                controller:'GooglePageSpeedController'
            })
            .when("/htpage",{
                templateUrl:"pages/ht_page_speed_analysis.html",
                controller:"GooglePageSpeedController"
            })

    });

    HtPageSpeed.filter('convertToMB',function(){
        return function(input){
            if(input != "undefined" && input != null && input != undefined){
                return (input/1024)/1024 + " mb";
            }
        };
    })


})();