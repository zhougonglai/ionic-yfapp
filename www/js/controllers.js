angular.module('starter.controllers', [])
  .controller("TabsCtrl",["$scope","ionicMaterialInk",function ($scope,ionicMaterialInk) {
    ionicMaterialInk.displayEffect();
    $scope.$on('$ionicView.enter', function(e) {
      console.log("Tabs in");
    });
  }])
  .controller("Home",["$scope","$ionicSlideBoxDelegate","$ionicLoading",function ($scope,$ionicSlideBoxDelegate,$ionicLoading) {
    $scope.$on("$ionicView.enter",function (e) {
      console.log("Home in");
      // $scope.setUserStruts(true);
    });


    var vm = this;
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
  .controller("List",["$scope",function ($scope) {
    var vm = this;
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
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('Account',["$scope","ionicMaterialInk", function($scope,ionicMaterialInk) {
  var vm = this;
  $scope.settings = {
    enableFriends: true
  };
  vm.showInfo = true;
  ionicMaterialInk.displayEffect();
}]);
