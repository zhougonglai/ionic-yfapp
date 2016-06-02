angular.module("starter.directive",[])
.directive("progress",["$timeout","$filter",function ($timeout,$filter) {
  var progress={
    restrict:"C",
    scope:{borrow:"=",remainder:"="},
    link:link
  };
  function link(scope, element, attr) {
    var progres = (scope.borrow-scope.remainder) /scope.borrow*100;
    $timeout(function () {
      element.animate({
        width:$filter("number")(progres,0)+"%"
      },Math.random()*1000);
    },Math.random()*1000);
  };
  return progress;
}]);
