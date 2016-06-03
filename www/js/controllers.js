angular.module('starter.controllers', [])
  .controller("TabsCtrl",["$scope","ionicMaterialInk",function ($scope,ionicMaterialInk) {
    $scope.$on('$ionicView.enter', function(e) {
      ionicMaterialInk.displayEffect();
    });
    var vm = this;
    vm.toggleMenu = true;
  }])
  .controller("Home",["$scope","$ionicSlideBoxDelegate","ionicMaterialMotion","$ionicTabsDelegate",function ($scope,$ionicSlideBoxDelegate,ionicMaterialMotion,$ionicTabsDelegate) {
    $scope.$on("$ionicView.enter",function (e) {
      console.log("Home in");
      // $scope.setUserStruts(true);
      ionicMaterialMotion.ripple();
    });


    var vm = this;
    vm.goTab2 = function () {
      $ionicTabsDelegate.select(1);
    };
    vm.slides = [
      {
        title : "Slide 1",
        data  : "Slide 1 Content"
      },{
        title : "Slide 2",
        data  : "Slide 2 Content"
      }
    ];
    vm.slideChange = function (index) {
      $ionicSlideBoxDelegate.slide(index,1000);
    };
    vm.slideClick = $scope.loading;

    vm.data = [
      {
        title:"创新工业",
        name : "Slide 1",
        number  : "Slide 1 Content",
        ripe:2533,
        low:82599
      },{
        title:"亿富科技",
        name : "Slide 2",
        number  : "Slide 2 Content",
        ripe:2533,
        low:82599
      }
    ];

  }])
  .controller("List",["$scope","ionicMaterialMotion",function ($scope,ionicMaterialMotion) {
    $scope.$on("$ionicView.enter",function (e) {
      ionicMaterialMotion.ripple();
    });
    var vm = this;
    vm.data = [
      {
        title:"创新工业",
        name : "Slide 1",
        number  : 10000,
        ripe:2533,
        low:82599
      },{
        title:"亿富科技",
        name : "Slide 2",
        number  : 100000,
        ripe:2533,
        low:82599
      }
    ];
  }])
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('Account',["$scope","ionicMaterialInk","ionicMaterialMotion", function($scope,ionicMaterialInk,ionicMaterialMotion) {
  var vm = this;
  $scope.settings = {
    enableFriends: true
  };
  vm.showInfo = true;
  $scope.$on("$ionicView.enter",function (e) {
    ionicMaterialMotion.ripple();
    ionicMaterialInk.displayEffect();
  });
}])
.controller("Recode",["$scope",function ($scope) {
  var vm = this;
  vm.test = "账户充值";
}])
  .controller("BindCard",["$scope",function ($scope) {
    var vm = this;
    vm.test= "用户绑卡";
  }]);
