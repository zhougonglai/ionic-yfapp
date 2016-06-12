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
.directive('autoListDivider', function($timeout) {
  var lastDivideKey = "";

  return {
    link: function(scope, element, attrs) {
      var key = attrs.autoListDividerValue;

      var defaultDivideFunction = function(k){
        return k.slice( 0, 1 ).toUpperCase();
      };

      var doDivide = function(){
        var divideFunction = scope.$apply(attrs.autoListDividerFunction) || defaultDivideFunction;
        var divideKey = divideFunction(key);

        if(divideKey != lastDivideKey) {
          var contentTr = angular.element("<div class='item item-divider'>"+divideKey+"</div>");
          element[0].parentNode.insertBefore(contentTr[0], element[0]);
        }

        lastDivideKey = divideKey;
      };

      $timeout(doDivide,0);
    }
  }
})
.directive('headerShrink', function($document) {
  var fadeAmt;

  var shrink = function(header, content, amt, max) {
    amt = Math.min(max, amt);
    fadeAmt = 1 - amt / max;
    ionic.requestAnimationFrame(function() {
      header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
      for(var i = 0, j = header.children.length; i < j; i++) {
        header.children[i].style.opacity = fadeAmt;
      }
    });
  };

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var starty = $scope.$eval($attr.headerShrink) || 0;
      var shrinkAmt;

      var amt;

      var y = 0;
      var prevY = 0;
      var scrollDelay = 0.4;

      var fadeAmt;

      var header = $document[0].body.querySelector('.bar-header');
      var headerHeight = header.offsetHeight;

      function onScroll(e) {
        var scrollTop = e.detail.scrollTop;

        if(scrollTop >= 0) {
          y = Math.min(headerHeight / scrollDelay, Math.max(0, y + scrollTop - prevY));
        } else {
          y = 0;
        }
        console.log(scrollTop);

        ionic.requestAnimationFrame(function() {
          fadeAmt = 1 - (y / headerHeight);
          header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + -y + 'px, 0)';
          for(var i = 0, j = header.children.length; i < j; i++) {
            header.children[i].style.opacity = fadeAmt;
          }
        });

        prevY = scrollTop;
      }

      $element.bind('scroll', onScroll);
    }
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
})
.filter("mask",function () {
  return function (input,on) {
    return on?input:"****";
  }
});
