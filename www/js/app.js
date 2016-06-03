angular.module('starter', ['ionic', 'starter.controllers', 'starter.services',"starter.value","starter.directive",'ionic-material','ngCordova',"ngResource"])
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
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('left');
  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

  $stateProvider
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: "TabsCtrl",
    controllerAs:"vm"
  })
  .state('tab.home', {
    url: '/home',
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
  })
  .state("tab.recode",{
    url:"/recode",
    views:{
      'tab-account':{
        templateUrl:"templates/account-recode.html",
        controller:"Recode",
        controllerAs:"vm"
      }
    }
  })
  .state("tab.bindCard",{
    url:"/bindCard",
    views:{
      "tab-account":{
        templateUrl:"templates/account-bindcard.html",
        controller:"BindCard",
        controllerAs:"vm"
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/home');

});
