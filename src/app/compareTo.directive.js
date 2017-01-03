(function () {
  angular.module('app')
    .directive('compareTo', ['$log', '$timeout', function ($log, $timeout) {
      return {
        require: 'ngModel',
        scope: {
          otherModelValue: '=compareTo',
          ngModel: '='
        },
        link: function (scope, elem, attrs, ctrl) {
          var confirmDirty = false;

          function compareMatch(compareModel, confirmCompareModel) {
            var matchingCompare = (compareModel === confirmCompareModel);
            ctrl.$setValidity('compareTo', matchingCompare);
          }

          elem[0].onblur = function () {
            $timeout(function () {
              if (ctrl.$modelValue) {
                compareMatch(scope.otherModelValue, ctrl.$modelValue);
                scope.$apply();
              }
            });
          };

          scope.$watch('otherModelValue', function () {
            if (confirmDirty) {
              compareMatch(scope.otherModelValue, ctrl.$modelValue);
            }
          });

          scope.$watch('ngModel', function (newValue) {
            if (!angular.isUndefined(newValue) && !confirmDirty) {
              confirmDirty = true;
            }
            if (confirmDirty) {
              compareMatch(scope.otherModelValue, ctrl.$modelValue);
            }
          });
        }
      };
    }]);
})();
