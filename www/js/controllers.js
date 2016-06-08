angular.module('starter.controllers', [])
//tab
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
//登陆注册
.controller("Login",["$scope","ionicMaterialInk",function ($scope,ionicMaterialInk) {
    $scope.$on("$ionicView.enter",function (e) {
      ionicMaterialInk.displayEffect();
    });

    var vm = this;
  }])
// 登陆
.controller("SignIn",["$scope","response","ionicMaterialInk","popup","$timeout","$state","local",
    function ($scope,response,ionicMaterialInk,popup,$timeout,$state,local) {
    $scope.$on("$ionicView.enter",function (e) {

    });
    function check_user(user) {
      if(user.phone&&user.pw){
        if(user.phone.length>=6&&user.pw.length>=6){
          popup.popup.loading(3000);
          return true;
        }else{
          popup.popup.alert({title:"注意",template:"格式有误"});
          return false;
        }
      }else{
        popup.popup.alert({title:"注意",template:"请填写表单"});
        return false;
      }
    }
    var vm = this;
    vm.user={};
    vm.pw = {
      icon:true,
      type:"password"
    };
    vm.user.on = true;
    vm.togglePW = function (pw) {
      vm.pw.icon = !pw.icon;
      vm.pw.type = (vm.pw.icon)?"password":"text";
    };

    vm.signIn = function (user) {
      check_user(user)?(
        response.user(user.phone,user.pw).save(function (response) {
          popup.popup.loadHide();
          if(angular.isNumber(response.check)){
            switch (response.check){
              case 0:
                var userdata = response.config;
                userdata.idcheck = response.idcheck;
                if(user.on){
                  $scope.setUserStruts(userdata,true);
                  local.putObj("user",$scope.user);
                }else{
                  $scope.setUserStruts(userdata,1);
                  local.putObj("user",$scope.user);
                }

                $state.go("tab.account");
                break;
              case 1:
                popup.popup.alert({title:"出错了",template:"空用户"});
                break;
              case 2:
                popup.popup.alert({title:"出错了",template:"密码错误"});
                break;
              case 3:
                popup.popup.alert({title:"出错了",template:"密码错误大于3次"});
                break;
            }
          }
        })
      ):null;
    };

  }])

// 注册
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



    vm.next = function (user) {
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

              popup.popup.alert({title:"第三步",template:"成功注册"});
          vm.step = 1;
          break;
      }
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
// 主页 tab-1
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

// 投资列表 tab-2
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

// 投资详情 tab-2-detail
.controller("Detail",["$scope","$stateParams",function ($scope,$stateParams) {
  var vm = this;
  vm.test = "详情页 成功";
  $scope.$on("$ionicView.enter",function (e) {
    console.log("详情页..enter",$stateParams);
  });
}])
// 用户详情 tab-3.
.controller('Account',["$scope","ionicMaterialInk","ionicMaterialMotion","popup","$state",
  function($scope,ionicMaterialInk,ionicMaterialMotion,popup,$state) {
  var vm = this;
  $scope.settings = {
    enableFriends: true
  };
  vm.showInfo = true;
    
    
  $scope.$on("$ionicView.enter",function (e) {
    ionicMaterialMotion.ripple();
    ionicMaterialInk.displayEffect();
    if($scope.user.on){
      console.log($scope.user);
      // if(!angular.equals($scope.user.on,true)){
        // popup.popup.prompt({title:"快捷登陆",template:"账号:"+$scope.user.phone,inputType:"password",defaultText:"123456",maxLength:16,inputPlaceHolder:"密码"});
      // }
    }else{
      $state.go("login.signIn");
    }
  });
}])

// 账户充值 tab-3.
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

  // 绑卡 tab-3
.controller("BindCard",["$scope",function ($scope) {
  var vm = this;
  vm.test= "用户绑卡";
}]);
