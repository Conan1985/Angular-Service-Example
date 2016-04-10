angular.module('app', [])

    .service('TemperatureMonitor',function () {
        // The service provides recordTemperature to record temperature and getCurrentMedian to calculate the median.
        var tempList=[];
        // Check is used to flag the inputs, as customized validation is required
        var check={
            number:true,
            notBig: true,
            notSmall: true
        };

        //recordTemperature method is used to record temperature inputs into an array.
        this.recordTemperature=function(temp){
            // Set check to be true so that the warnings will be hided by default.
            check.number=true;
            check.notBig=true;
            check.notSmall=true;
            // If the input is a right number, push it to the array, otherwise flag the check.

            /* The right way to check a number:
            function isNumeric(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            } */

            if(isNaN(temp) || temp==null){
                check.number=false;
            } else if(temp>Number.MAX_VALUE){
                check.notBig = false;
            } else if(temp<(-Number.MAX_VALUE)){
                check.notSmall=false;
            } else {
                tempList.push(+temp);
            }
        };

        // Calculate the median of the array of temperatures. If the array has even numbers of temperature, return the average of the middle two; if the array has odd numbers of temperature, return the middle one.
        this.getCurrentMedian=function(){
            tempList.sort(function(a,b){return a-b});
            if (tempList.length%2==1){
                return tempList[(tempList.length-1)/2];
            } else {
                return (tempList[tempList.length/2]+tempList[tempList.length/2-1])/2;
            }
        };

        this.list=function(){
            return tempList;
        };

        this.checkValue=function(){
            return check;
        };

    })

    .controller('TempController',function($scope,TemperatureMonitor){
        $scope.tempList=TemperatureMonitor.list();
        $scope.check=TemperatureMonitor.checkValue();

        // call the method of recordTemperature
        $scope.saveTemp=function(){
            TemperatureMonitor.recordTemperature($scope.newTemp);
            $scope.newTemp=null;
        };

        // call the method of calculate median
        $scope.callMedian=function(){
            $scope.tempMedian=TemperatureMonitor.getCurrentMedian();
        };
    });



