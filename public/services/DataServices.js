(function () {

    'use strict';


    var DataServices = angular.module('DataServices',[]);

    DataServices.factory('DataServices',['$http','$q',function($http,$q){
        return {
            _getGooglePageSpeedInsights:function (params) {
                console.log(params)
                var deferred = $q.defer();
                $http.post('/getGooglePageSpeedInsights',{params:params})
                    .then(function(data) {
                        deferred.resolve(data);
                    }).catch(function(){
                    deferred.reject();
                });

                return deferred.promise;
            }
        };
    }]);

})();