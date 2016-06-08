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
  }
  return progress;
}])

.directive('fabButtonRight', function fabButtonDirective() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: template,
    link: link
  };
  //isAnchor
  function isAnchor(attr) {
    return angular.isDefined(attr.href) || angular.isDefined(attr.ngHref);
  }
  //template
  function template(element, attr) {
    return isAnchor(attr) ?
      '<a class="fab-button-right" ng-transclude></a>' :
      '<button class="fab-button-right" ng-transclude></button>';
  }
  //link
  function link(scope, element, attr) {
    var target = '#'+attr['targetId'];
    //var bgColor = attr['bg-color'];
    //element.style=bgColor;
    var targetEl = angular.element(document.querySelector(target));
    var savePos = 0;
    targetEl.bind('scroll', function (e) {
      //console.log(savePos)
      if (savePos < e.detail.scrollTop) {
        savePos = e.detail.scrollTop;
        element.removeClass('zoomIn animated');
        element.addClass('zoomOut animated');
      }
      if (savePos > e.detail.scrollTop) {
        savePos = e.detail.scrollTop;
        element.removeClass('zoomOut animated');
        element.addClass('zoomIn animated');
      }
    });
  }
})
.directive('fabButtonLeft', function fabButtonDirective() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: template,
    link: link1
  };
  //isAnchor
  function isAnchor(attr) {
    return angular.isDefined(attr.href) || angular.isDefined(attr.ngHref);
  }
  //template
  function template(element, attr) {
    return isAnchor(attr) ?
      '<a class="fab-button-left" ng-transclude></a>' :
      '<button class="fab-button-left" ng-transclude></button>';
  }
  //link
  function link1(scope, element, attr) {
    var target = '#'+attr['targetId'];
    //var bgColor = attr['bg-color'];
    //element.style=bgColor;
    var targetEl = angular.element(document.querySelector(target));
    var savePos = 0;
    targetEl.bind('scroll', function (e) {
      //console.log(savePos)
      if (savePos < e.detail.scrollTop) {
        savePos = e.detail.scrollTop;
        element.removeClass('fadeInUp animated');
        element.addClass('fadeOutDown animated');
      }
      if (savePos > e.detail.scrollTop) {
        savePos = e.detail.scrollTop;
        element.removeClass('fadeOutDown animated');
        element.addClass('fadeInUp animated');
      }
    });
  }
})
  //filter
.filter("floor",function(){
  return function(input,number){
    if(angular.isNumber(number)){
      return Math.floor(input*Math.pow(10,number))/Math.pow(10,number);
    }else if(angular.isUndefined(number)&&input){
      return Math.floor(input);
    }else{
      return 0.00;
    }
  };
});
