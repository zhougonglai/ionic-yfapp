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



.directive("topTabs",["$timeout",function ($timeout) {
  var directive = {
    restrict: 'E',
    scope: {
      tabs: '=',
      activated: '='
    },
    required: 'type',
    replace: true,
    template: '<section class="tabs-top tabs-background-light cs-top-tabs">' +
    '<div class="tab-nav tabs">' +
    '<a class="tab-item" ng-repeat="item in tabs" ng-class="{\'tab-item-active\': item.id==activated}" ng-click="active(item.id)">' +
    '<span class="tab-title">{{item.title}}</span>' +
    '</a>' +
    '</div>' +
    '</section>',
    link: function(scope, element, attr) {
      $timeout(function() {
        var type = attr.type;

        element.find('a').addClass('tab-item-' + type);
      }, 100);

      scope.active = function(id) {
        scope.activated = id;
      };
    }
  };

  return directive;
}]);
