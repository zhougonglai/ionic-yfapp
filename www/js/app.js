angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.services',
  "starter.value",
  "starter.directive",
  'ionic-material',
  'ngCordova',
  "ngResource",
  'ionMDRipple'
])
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

.config(["$stateProvider", "$urlRouterProvider","$ionicConfigProvider","$httpProvider",
  function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider) {
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
  .state("login",{
    url:"/login",
    abstract:true,
    templateUrl:"templates/login/login.html",
    controller:"Login",
    controllerAs:"vm"
  })
    .state("login.signIn",{
      url:"/signIn",
      views:{
        "sign-in":{
          templateUrl:"templates/login/sign-in.html",
          controller:"SignIn",
          controllerAs:"vm"
        }
      }
    })
    .state("login.signUp",{
      url:"/signUp",
      views:{
        "sign-up":{
          templateUrl:"templates/login/sign-up.html",
          controller:"SignUp",
          controllerAs:"vm"
        }
      }
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

  // $urlRouterProvider.otherwise('/tab/home');
  $urlRouterProvider.otherwise('/login/signIn');

  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
}]);
