angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.services',
  "starter.value",
  "starter.directive",
  "ngAnimate",
  "ngCookies",
  "ngFx",
  'ionic-material',
  'ngCordova',
  "ngResource",
  'ionMDRipple'
])
.run(["$ionicPlatform","$rootScope","local",
  function($ionicPlatform,$rootScope,local) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  //快捷登陆凭证
  var user = local.getObj("user");
  if(angular.isDefined(user)){
    $rootScope.user = user;
  }else{
    $rootScope.user = {
      on:false
    }
  }
  $rootScope.setUserStruts = function (config,boolean) {
    $rootScope.user = config;
    $rootScope.user.on = boolean;
  };
}])

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

  var phoneMach = "^((13[0-9])|(14[5|7])|(15[0|1|2|3|5|6|7|8|9])|(17[6|7|8])|18[0-9])\\d{8}|(170[0|5|9]\\d{7})$";

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
    url:"/signUp?{friend:"+phoneMach+"}&{phone:"+phoneMach+"}",
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
  .state("tab.detail",{
    url:"/detail/:id",
    views:{
      "tab-list":{
        templateUrl:"templates/tab-detail.html",
        controller:"Detail",
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

  $urlRouterProvider.otherwise('/tab/account');
  // $urlRouterProvider.otherwise('/login/signIn');
  // $urlRouterProvider.otherwise('/login/signUp');
  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
}]);
