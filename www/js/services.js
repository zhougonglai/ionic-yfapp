angular.module('starter.services', [])
  .constant("baseUrl","http://localhost:8080/")
  //请求列表
  .factory("response",["$resource","baseUrl",function ($resource,baseUrl) {
    var phone = function (phone,key) {
      return $resource("/mobile/get",{phone:phone,key:key});
    };
    var user = function (username, password) {
      return $resource("/wechat/signIn",{username:username,password:password});
    };
    var logout =function () {
      return $resource("/wechat/logout");
    };
    var userCheck = function (phone) {
      return $resource("/wechat/checkUser",{phone:phone});
    };
    var idCheck = function (name,number) {
      return $resource("/wechat/idcheck",{name:name,id:number});
    };
    var myBank = function (userId) {
      return $resource("/wechat/getMyBank",{userId:userId});
    };
    var bankList = function () {
      return $resource("/wechat/getbank");
    };
    // /front/transaction/recharge
    var recodeUrl = "/wechat/recharge";
    var checkMail = function (cardId,money) {
      return $resource(recodeUrl+"/validateMoney",{bankCardId:cardId,recharMoney:money});
    };
    var checkPw = function (password) {
      return $resource(recodeUrl+"/checkpaypassword",{payPw:password});
    };
    var deposit = function (money,cardId) {
      return $resource(recodeUrl+"/rechargeHostingDeposit",{recharMoneyParam:money,bankCardId:cardId,payMethod:"bindingPay"});
    };
    var checkCode = function (code) {
      return $resource(recodeUrl+"/rechargeHostingPay",{valiCode:code});
    };

    var cityList = function () {
      return $resource("/wechat/getCity");
    };
    var selectCity = function (id) {
      return $resource("/wechat/getCityMap",{cityId:id});
    };
    // 绑卡 提交
    var cardCheck = function (cityId,townId,bankId,cardId,phone,userId) {
      return $resource("/wechat/security/bankinformation",{provinces:cityId,cities:townId,bankCard_no:bankId,cardId:cardId,phone_no:phone,userId:userId});
    };
    // 绑卡 确认
    var confirm = function (code,cardId,userId) {
      return $resource("/wechat/securityinfo/continue",{code:code,cardId:cardId,userId:userId});
    };
    // 项目列表
    var facts = function () {
      return $resource("/wechat/list/:page",{page:"@page"},{cache:false});
    };
    var getDetail = function () {
      return $resource("/wechat/detail/:detailId",{detail:"@detail"},{cache:false});
    };
    return {
      phone:phone,
      user:user,
      check:userCheck,
      checkMail:checkMail,
      checkPw:checkPw,
      checkCode:checkCode,
      cityList:cityList,
      cardCheck:cardCheck,
      confirm:confirm,
      facts:facts,
      logout:logout,
      idCheck:idCheck,
      myBank:myBank,
      getDetail:getDetail,
      bankList:bankList,
      deposit:deposit,
      selectCity:selectCity
    }
  }])
  //本地服务
  .factory("local",["$cookies",function ($cookies) {
    var local = {};
    local.get = function(key){
      return $cookies.get(key);
    };
    local.getObj = function (key) {
      return $cookies.getObject(key);
    };
    local.getAll = function () {
      return $cookies.getAll();
    };
    local.put = function (key,value) {
      var date = new Date();
      date.setDate(date.getDate()+7);
      $cookies.put(key,value,{expires:date});
    };
    local.putObj = function (key, value) {
      var date = new Date();
      date.setDate(date.getDate()+7);
      $cookies.putObject(key,value,{expires:date});
    };
    local.remove = function (key) {
      $cookies.remove(key);
    };
    return local;
  }])
  //登录服务
  .factory("loginService",["response","popup","local","$state",
    function (response,popup,local,$state) {
    var login = {
      set:loginSet
    };

    function loginSet(modal,fun,login) {
      modal.pw = {
        icon:true,
        type:"password"
      };
      modal.user = {
        on:true
      };
      modal.togglePW = function (pw) {
        modal.pw.icon = !pw.icon;
        modal.pw.type = (modal.pw.icon)?"password":"text";
      };
      modal.signIn = function (user) {
        popup.popup.checkUser(user)?(
          response.user(user.phone,user.pw).save(function (res) {
            popup.popup.loadHide();
            if(angular.isNumber(res.check)){
              switch (res.check){
                case 0:
                  var userdata = res.config;
                  userdata.idcheck = res.idcheck;
                  if(user.on){
                    fun(userdata,true);
                    userdata.on=true;
                    local.putObj("user",userdata);
                  }else{
                    fun(userdata,1);
                    userdata.on=1;
                    local.putObj("user",userdata);
                  }
                  login(false);
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
            }else{
              return false;
            }
          })
        ):null;

      };

    }

    return login;
  }])
  // 弹出服务
  .service("popup",["$ionicPopup", "$timeout","$ionicLoading",
    function ($ionicPopup, $timeout,$ionicLoading) {
    var base = {
      title:"标题",
      cssClass:"",
      subTitle:"",
      template:"文本",
      templateUrl:"",
      okText:"确定",
      okType:""
    };
    function alert(param,fun) {
      var config = angular.extend(base,{});
      $ionicPopup.alert(angular.extend(config,param)).then(fun);
    }

    function confirm(param,fun) {
      var config = angular.extend(base,{cancelText:"取消",cancelType:"button-assertive"});
      $ionicPopup.confirm(angular.extend(config,param)).then(fun);
    }

    function prompt(param, fun) {
      var config = angular.extend(base,{inputType:"",defaultText:"",maxLength:null,inputPlaceHolder:"",cancelText:"取消",cancelType:"button-assertive"});
      $ionicPopup.prompt(angular.extend(config,param)).then(fun);
    }

    function custom(param, fun) {
      var buttons = [
        {
          text:"取消",
          type:"button-assertive",
          onTap:fun.onCancel||function (e) {
            e.preventDefault();
          }
        },
        {
          text:"确定",
          type:"button-positive",
          onTap:fun.onPostive||function (e) {
            //return scope;
          }
        }
      ];

      var config = angular.extend(base,{scope:null,buttons:buttons});
      $ionicPopup.show(angular.extend(config,param)).then(fun.callback);
    }
    //loading..
    function loading(timer,fun) {
      $ionicLoading.show({
        duration:timer|1000
      }).then(fun);
    }

    function loadHide() {
      $ionicLoading.hide();
    }


    function checkUser(user) {
      if(user.phone&&user.pw){
        if(user.phone.length>=6&&user.pw.length>=6){
          loading(1000*10);
          return true;
        }else{
          alert({title:"注意",template:"格式有误"});
          return false;
        }
      }else{
        alert({title:"注意",template:"请填写表单"});
        return false;
      }
    }


    this.popup={
      alert:alert,
      confirm:confirm,
      prompt:prompt,
      custom:custom,
      loading:loading,
      loadHide:loadHide,
      checkUser:checkUser
    }
  }])
  //视图服务
  .factory("viewService",["$ionicHistory",function ($ionicHistory) {
    var view = {
      goBack:goBack,
      viewHistory:viewHistory,
      currentView:currentView,
      removeBackView:removeBackView,
      clearHistory:clearHistory,
      clearCache:clearCache
    };
    function goBack(backCount) {
      angular.isNumber(backCount)?$ionicHistory.goBack(backCount):$ionicHistory.goBack();
    }
    function viewHistory() {
      return $ionicHistory.viewHistory();
    }
    function currentView() {
      return $ionicHistory.currentView();
    }
    function removeBackView() {
      $ionicHistory.removeBackView();
    }
    function clearHistory() {
      $ionicHistory.clearHistory();
    }
    function clearCache() {
      return $ionicHistory.clearCache();
    }
    return view;
  }])
;

