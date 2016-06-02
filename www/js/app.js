angular.module('starter', ['ionic', 'starter.controllers', 'starter.services',"starter.value","starter.directive",'ionic-material'])
.run(function($ionicPlatform,$rootScope,$ionicLoading) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  $rootScope.userInfo = {

  };
  $rootScope.userStruts = $rootScope.userStruts?true:false;
  $rootScope.setUserStruts = function (boolean) {
    $rootScope.userStruts = boolean;
    console.log($rootScope.userStruts);
  };
  $rootScope.loading=function(timer){
    $ionicLoading.show({
      duration:timer|1000
    }).then(function () {
      console.log("loading show! start");
    });
  };
  $rootScope.loadHide = function () {
    $ionicLoading.hide();
  };
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(5);
  $stateProvider
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: "TabsCtrl"
  })
  .state('tab.home', {
    url: '/dash',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'Home',
        controllerAs:"vm"
      }
    }
  })
  .state('tab.list', {
      url: '/list',
      views: {
        'tab-list': {
          templateUrl: 'templates/tab-list.html',
          controller: 'List',
          controllerAs:"vm"
        }
      }
    })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'Account',
        controllerAs:"vm"
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
