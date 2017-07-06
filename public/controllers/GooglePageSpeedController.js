(function () {

    'use strict';


    var GooglePageSpeedController = angular.module('GooglePageSpeedController',['DataServices']);

    GooglePageSpeedController.controller('GooglePageSpeedController',['$rootScope','$scope','DataServices',function($rootScope,$scope,DataServices){


         $scope.targeted_comapnies = [
            {
                "id":'1',
                "title":"HindustantTimes",
                "url":"http://hindustantimes.com"
            },{
                "id":'2',
                 "title":"Times of India",
                 "url":"http://timesofindia.indiatimes.com/"
            },{
                "id":'3',
                 "title":"India Express",
                "url":"http://indianexpress.com/"
            },{
                "id":'4',
                 "title":"NDTV",
                "url":"http://www.ndtv.com/"
            },{
                "id":"5",
                 "title":"News18",
                "url":"http://www.news18.com/"
            },{
                "id":"6",
                 "title":"India Today" ,
                "url":"http://indiatoday.intoday.in/"
            },{
                "id":"7",
                 "title":"First Post",
                "url":"http://www.firstpost.com/"
            }
        ];


        $scope.getGooglePageSpeedInsights = function(params){
          DataServices._getGooglePageSpeedInsights(params).then(function(response){
              if(response.status == 200){
                  $scope.googlePageSpeedInsights = response.data;
                  console.log(response.data);
              }
          });
        };


        var getGooglePageSpeed = function(target){
            var params = {};
            params.url = target;

            $scope.w = "hola";

            DataServices._getGooglePageSpeedInsights(params).then(function(response){
                if(response.status == 200){
                    $scope.googlePageSpeedInsights = response.data;
                }
            });
        };

        $scope.target_google_pagespeed_desktop = [];
        $scope.target_google_pagespeed_mobile = [];

        $scope.startGettingData = function () {
            $scope.targeted_comapnies.forEach(function(v,k){
                // console.log(v.url);
                DataServices._getGooglePageSpeedInsights(v).then(function(response){
                    if(response.status == 200){
                        $scope.googlePageSpeedInsights = response.data;
                        console.log(response.data);
                        $scope.target_google_pagespeed_desktop.push({
                            url:v.url,
                            data:response.data
                        });
                    }
                });
            });
        };

        var default_target = "http://hindustantimes.com";
        var params = {url : default_target};

        $scope.htPageSpeedAnalysis = function(){
            DataServices._getGooglePageSpeedInsights(params).then(function(response){
                if(response.status == 200){
                    $scope.htPageSpeedAnalysisData = response.data;
                    $scope.desktop_rule_impact = [];
                    $scope.mobile_rule_impact = [];
                    if(response.data != "undefined" && response.data != undefined && response.data != null){
                        response.data.forEach(function(v,k){
                            if(v.desktop != "undefined" && v.desktop != null ){
                                var p =  v.desktop.formattedResults.ruleResults;
                                for(var key in p){
                                    if (p.hasOwnProperty(key)) {
                                        if(p[key].ruleImpact != 0){
                                            $scope.desktop_rule_impact.push(p[key]);
                                        }
                                    }
                                }
                            }else if(v.mobile != "undefined" && v.mobile != null){
                                console.log(v.mobile.formattedResults.ruleResults);
                                var p =  v.mobile.formattedResults.ruleResults;
                                for(var key in p){
                                    if (p.hasOwnProperty(key)) {
                                        if(p[key].ruleImpact != 0){
                                            $scope.mobile_rule_impact.push(p[key]);
                                        }
                                    }
                                }
                            }else{}

                        });

                        console.log($scope.desktop_rule_impact);
                    }else{
                        console.log('response.data undefined');
                    }
                }
            });
        };

        $scope.getCatchPointData = function(){

        };











    }])


})();