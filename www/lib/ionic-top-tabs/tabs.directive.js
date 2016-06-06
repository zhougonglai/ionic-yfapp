(function() {
  'use strict';

  angular
    .module('ionicTopTabs', [])
    .directive('topTabs', topTabs);

  /** @ngInject */
  function topTabs($timeout) {
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
  }

})();
