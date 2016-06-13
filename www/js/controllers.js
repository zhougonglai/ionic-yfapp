angular.module('starter.controllers', [])
//tab
.controller("TabsCtrl",["$scope","ionicMaterialInk","response","$state","$ionicSideMenuDelegate",
  function ($scope,ionicMaterialInk,response,$state,$ionicSideMenuDelegate) {
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
      name:'paper-airplane',
      label:"注册",
      sub:"推荐送积分",
      rec:"login.signUp",
      userStruts:true
    },
    {
      name:'log-out',
      label:"安全退出",
      sub:"轻松理财",
      rec:"login.out",
      userStruts:false
    }
  ];
  $scope.closeMenu = function(){
    if($ionicSideMenuDelegate.isOpenRight()){
      $ionicSideMenuDelegate.toggleRight(false);
      vm.toggleMenu=false;
    }
  };
  vm.logout = function () {
    response.logout().get(function (res) {
      if(res){
        angular.isNumber($scope.user.on)?$scope.setUserOn(0):$scope.setUserOn(false);
        $scope.saveUserStruts();
        $scope.closeMenu();
        $state.go("tab.home",{},{reload:true});
      }
    });
  };
  vm.logUp = function (index) {
    switch (index){
      case 0:
        $scope.closeMenu();
        $scope.login(true);
            break;
      case 1:
        $scope.closeMenu();
        $state.go("login.signUp");
            break;
    }
  };
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
      popup.popup.checkUser(user)?(
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
      // console.log($scope.user);
    }else{
        $scope.login(true);
    }
  });

}])

// 账户充值 tab-3.
.controller("Recode",["$scope","bank","popup","response","$ionicHistory",function ($scope,bank,popup,response,$ionicHistory) {
  var vm = this;
  vm.title = "账户充值";
  vm.userInfo = {
    lock:true,
    pwType:"password"
  };
  vm.sendCode = false;
  vm.toggleLock = function (userInfo) {
    vm.userInfo.lock = !userInfo.lock;
    vm.userInfo.pwType = vm.userInfo.lock?"password":"text";
  };
  function error_back(error,title) {
    $ionicHistory.goBack();
    popup.popup.alert({title:title||"请求失败",template:"请在网络良好的环境下再次尝试"});
  }
  function checkMail(user){
    response.checkMail(user.bankSelect.id,user.reNumber).save(function(res){
      if(res !== "PERMIT"){
        popup.popup.alert({title:"验证失败",template:res});
      }else if(angular.equals("PERMIT",res)){
        response.checkPw(user.pw).save(function (res) {
          if(!res){
            popup.popup.alert({title:"充值失败",template:"网络状况不良"});
          }else{
            if(res.same){
              vm.sendCode = true;
              // - 请求发送开始 -
              response.deposit(user.reNumber,user.bankSelect.id).save(function (res) {
                if(res.error){
                  popup.popup.alert({title:"充值失败",template:res.error});
                }else if(res.success){
                  popup.popup.alert({title:"提交成功",template:res.success});
                }else if(res.status){
                  popup.popup.alert({title:"充值处理中",template:res.status});
                }else if(res.process){
                  popup.popup.alert({title:"充值处理中",template:res.process});
                }
              },error_back)
            }
          }
        },error_back);
      }
    },error_back);
  }

  function validataCoding(user) {
    var valid = response.checkCode(user.code).save(function (res) {
      vm.sendCode = false;
      if(res.error){
        popup.popup.alert({title:"充值失败",template:res.error});
      }else if(res.success){
        popup.popup.alert({title:"充值成功",template:res.success});
      }
    },error_back);
  }

  vm.submit = function (user) {
    console.log(user);
    vm.sendCode?validataCoding(user):checkMail(user);
  };

  $scope.$on("$ionicView.enter",function (e) {
    bank.query(function (res) {
      vm.banklist = res;
    },function (error) {
      error_back(null,"获取银行列表失败");
    });
  });

}])

  // 绑卡 tab-3
.controller("BindCard",["$scope",function ($scope) {
  var vm = this;
  vm.test= "用户绑卡";
}])

.controller("Autonym",["$scope","response","popup",function ($scope,response,popup) {
  var vm = this;
  vm.title = "实名认证";
  vm.user = {};
  vm.autonym = function (user) {
    if(user.hasOwnProperty("idNumber")&&user.hasOwnProperty("name")){
      var number = user.idNumber,name = user.name;
      if(number.length>=18&&name.length>=2){
        response.idCheck(user.name,user.idNumber).save(function (res) {
          if(res.checkout){
            popup.popup.alert({title:res.checkout,template:"请稍后再试"});
            $state.go("tab.home");
          }else if(res.success){
            popup.popup.alert({title:"恭喜",template:res.success});
            $scope.idPass();
            $state.go("app.account");
          }
        },function (error) {
          $state.go("tab.home");
        });
      }else{
        popup.popup.alert({title:"出错了",template:"表单格式有误"});
      }
    }else{
      popup.popup.alert({title:"出错了",template:"请填写表单"});
    }
  };

}])
;
