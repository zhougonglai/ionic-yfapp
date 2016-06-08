angular.module('starter.services', [])
  .constant("baseUrl","http://localhost:8080/")
  .factory("response",["$resource","baseUrl",function ($resource,baseUrl) {
    var phone = function (phone,key) {
      return $resource("/mobile/get",{phone:phone,key:key});
    };
    var user = function (username, password) {
      return $resource("/wechat/signIn",{username:username,password:password});
    };
    return {
      phone:phone,
      user:user
    }
  }])
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

    function loading(timer,fun) {
      $ionicLoading.show({
        duration:timer|1000
      }).then(fun);
    }

    function loadHide() {
      $ionicLoading.hide();
    }
    this.popup={
      alert:alert,
      confirm:confirm,
      prompt:prompt,
      custom:custom,
      loading:loading,
      loadHide:loadHide
    }
  }])
;

