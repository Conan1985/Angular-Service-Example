describe("TempController",function(){
    beforeEach(module('app'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller=_$controller_  ;
    }));

    describe("Test the temperature accepting function",function(){

        it('A number can be accepted', function(){
            var $scope={};
            var controller=$controller('TempController',{$scope:$scope});
            $scope.newTemp = '3.14';
            $scope.saveTemp();
            expect($scope.check.number).toBe(true);
            expect($scope.tempList).toEqual([3.14]);

            $scope.newTemp='50';
            $scope.saveTemp();
            expect($scope.check.number).toBe(true);
            expect($scope.tempList).toEqual([3.14, 50]);

            $scope.newTemp='-7';
            $scope.saveTemp();
            expect($scope.check.number).toBe(true);
            expect($scope.tempList).toEqual([3.14, 50, -7]);
        });

        it('An input that is not number can not be accepted', function(){
            var $scope={};
            var controller=$controller('TempController',{$scope:$scope});
            $scope.newTemp='Owen';
            $scope.saveTemp();
            expect($scope.check.number).toBe(false);
            expect($scope.tempList).toEqual([]);

            $scope.newTemp='12 5';
            $scope.saveTemp();
            expect($scope.check.number).toBe(false);
            expect($scope.tempList).toEqual([]);

            $scope.newTemp=null;
            $scope.saveTemp();
            expect($scope.check.number).toBe(false);
            expect($scope.tempList).toEqual([]);
        });

        it('A number too big would not be accepted', function(){
            var $scope={};
            var controller=$controller('TempController',{$scope:$scope});
            $scope.newTemp=3.14e2000;
            $scope.saveTemp();
            expect($scope.check.notBig).toBe(false);
            expect($scope.tempList).toEqual([]);
        });

        it('A number too small would not be accepted', function(){
            var $scope={};
            var controller=$controller('TempController',{$scope:$scope});
            $scope.newTemp=-3.14e2000;
            $scope.saveTemp();
            expect($scope.check.notSmall).toBe(false);
            expect($scope.tempList).toEqual([]);
        });
    });

    describe('Test the median calculating function',function() {

        it("Test the inputs: [5, 1, -7, 7, 8, 3] ", function () {
            var $scope = {};
            var controller = $controller('TempController', {$scope: $scope});
            $scope.newTemp=5;
            $scope.saveTemp();
            $scope.newTemp=1;
            $scope.saveTemp();
            $scope.newTemp=-7;
            $scope.saveTemp();
            $scope.newTemp=7;
            $scope.saveTemp();
            $scope.newTemp=8;
            $scope.saveTemp();
            $scope.newTemp=3;
            $scope.saveTemp();
            $scope.callMedian();
            expect($scope.tempList).toEqual([-7, 1, 3, 5, 7, 8]);
            expect($scope.tempMedian).toEqual(4);
        });

        it("Test the inputs: [5, 1, -7, 7, 8, 3, 9] ", function () {
            var $scope = {};
            var controller = $controller('TempController', {$scope: $scope});
            $scope.newTemp=5;
            $scope.saveTemp();
            $scope.newTemp=1;
            $scope.saveTemp();
            $scope.newTemp=-7;
            $scope.saveTemp();
            $scope.newTemp=7;
            $scope.saveTemp();
            $scope.newTemp=8;
            $scope.saveTemp();
            $scope.newTemp=3;
            $scope.saveTemp();
            $scope.newTemp=9;
            $scope.saveTemp();
            $scope.callMedian();
            expect($scope.tempList).toEqual([-7, 1, 3, 5, 7, 8, 9]);
            expect($scope.tempMedian).toEqual(5);
        });

    });


});