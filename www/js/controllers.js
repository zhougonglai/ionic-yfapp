angular.module('starter.controllers', [])
  .controller("TabsCtrl",["$scope","ionicMaterialInk",function ($scope,ionicMaterialInk) {
    $scope.$on('$ionicView.enter', function(e) {
      ionicMaterialInk.displayEffect();
    });
    var vm = this;
    vm.toggleMenu = true;
    vm.names = [
      {
        name:'log-in',
        label:"用户登陆",
        sub:"请于安全位置登陆",
        rec:"login.signIn",
        userStruts:true
      },
      {
        name:'log-out',
        label:"安全退出",
        sub:"轻松理财",
        rec:"login.signIn",
        userStruts:false
      }
    ];

  }])

  .controller("Login",["$scope","ionicMaterialInk",function ($scope,ionicMaterialInk) {
    $scope.$on("$ionicView.enter",function (e) {
      ionicMaterialInk.displayEffect();
    });

    var vm = this;
    vm.test = "登陆页面";
    vm.clientSideList = [
      { text: "Settings", value: "cog" },
      { text: "Analytics", value: "pie" },
      { text: "Profile", value: "person" },
      { text: "Alerts", value: "bell" },
      { text: "Calendar", value: "calendar" }
    ];

    vm.data = "cog";
  }])
  .controller("SignIn",["$scope","response","ionicMaterialInk","$http",function ($scope,response,ionicMaterialInk,$http) {
    $scope.$on("$ionicView.enter",function (e) {

    });
    var vm = this;
    vm.user={};
    vm.pw = {
      icon:true,
      type:"password"
    };
    vm.togglePW = function (pw) {
      vm.pw.icon = !pw.icon;
      vm.pw.type = (vm.pw.icon)?"password":"text";
    };

    vm.signIn = function (user) {
      response.user(user.phone,user.pw).save(function (response) {
         console.log(response.config,response.check,response.idcheck);
      });
    };

  }])
  .controller("SignUp",["$scope","popup","$stateParams",function ($scope,popup,$stateParams) {
    var vm = this;
    vm.test = "注册成功";
    vm.step = 1;
    vm.user = {};
    vm.pw = {
      icon:true,
      type:"password"
    };
    vm.confirm = "下一步";
    vm.pws = angular.copy(vm.pw);



    vm.next =function (user) {
      var match = "^((13[0-9])|(14[5|7])|(15[0|1|2|3|5|6|7|8|9])|(17[6|7|8])|18[0-9])\\d{8}|(170[0|5|9]\\d{7})$";

      function check_phone_user(phone) {
        //用户号码 符合号码格式 &&且 长度为11位
        var rule_user = phone.match(match)&&angular.equals(phone.length,11);
        rule_user? (vm.step++): (popup.popup.alert({title:"出错了",template:"手机号格式不正确"}));
      }
      function check_phone_friend(user) {
        //推荐人号码 符合号码格式 &&且 长度为11位
        var rule_friend = user.friend.match(match)&&angular.equals(user.friend.length,11)&&(!angular.equals(user.phone,user.friend));
        rule_friend?check_phone_user(user.phone):(popup.popup.alert({title:"出错了",template:"推荐人手机号格式不正确"}));
      }

      function check_pw(user){
        (user.pw.length>5)?vm.step++:popup.popup.alert({title:"出错了",template:"密码太短"});
      }
      switch(vm.step) {
        case 1:
          user.friend?
            (// 填写推荐人
              check_phone_friend(user)
            ):
            (//未填写推荐人
              user.phone?
                (
                  check_phone_user(user.phone)
                ):
                (
                  popup.popup.alert({title:"出错了",template:"请填写注册手机号"})
                )
            );
          break;
        case 2:
          (user.pw&&user.pws&&user.pw==user.pws)?
            (//用户密码和确认密码一致
              check_pw(user)
            ):
            (
              popup.popup.alert({title:"出错了",template:"请重新检查您的密码"})
            );
          vm.confirm = "注册";
          break;
        case 3:
          console.log("step3",vm.step);
              popup.popup.alert({title:"第三步",template:"成功注册"});
          vm.step = 1;
          break;
      }
    };
    vm.nextStep = function () {


      // (vm.step<3)?vm.step++:null;
    };
    vm.togglePW = function (pw) {
      vm.pw.icon = !pw.icon;
      vm.pw.type = (vm.pw.icon)?"password":"text";
    };
    vm.togglePWs = function (pw) {
      vm.pws.icon = !pw.icon;
      vm.pws.type = (vm.pws.icon)?"password":"text";
    };

    $scope.$on("$ionicView.enter",function (e) {
      vm.user.phone = $stateParams.phone;
      vm.user.friend = $stateParams.friend;
    });

  }])

  .controller("Home",["$scope","$ionicSlideBoxDelegate","ionicMaterialMotion","$ionicTabsDelegate",function ($scope,$ionicSlideBoxDelegate,ionicMaterialMotion,$ionicTabsDelegate) {
    $scope.$on("$ionicView.enter",function (e) {
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
        id:25,
        title:"创新工业",
        name : "Slide 1",
        number  : 10000,
        ripe:2533,
        low:82599
      },{
        id:42,
        title:"亿富科技",
        name : "Slide 2",
        number  : 100000,
        ripe:2533,
        low:82599
      }
    ];
  }])
.controller("Detail",["$scope","$stateParams",function ($scope,$stateParams) {
  var vm = this;
  vm.test = "详情页 成功";
  $scope.$on("$ionicView.enter",function (e) {
    console.log("详情页..enter",$stateParams);
  });
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
  vm.userInfo = {
    lock:true,
    pwType:"password"
  };

  vm.toggleLock = function (userInfo) {
    vm.userInfo.lock = !userInfo.lock;
    vm.userInfo.pwType = vm.userInfo.lock?"password":"text";
  }
}])
.controller("BindCard",["$scope",function ($scope) {
  var vm = this;
  vm.test= "用户绑卡";
}]);
