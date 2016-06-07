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
  .service("popup",["$ionicPopup", "$timeout",function ($ionicPopup, $timeout) {
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
    this.popup={
      alert:alert,
      confirm:confirm,
      prompt:prompt,
      custom:custom
    }
  }])
;

