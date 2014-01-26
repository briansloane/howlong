'use strict';

angular.module('howlongApp')
  .controller('MainCtrl', function ($scope) {
    $scope.home = "1040 N American St. Unit 1103, Philadelphia, PA 19123";

    $scope.calculateDistances = function() {
      howlong.calculateDistances($scope.origin, $scope.destination);
    }
  });
