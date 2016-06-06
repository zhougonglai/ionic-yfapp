angular.module('starter.services', [])
  .constant("baseUrl","192.168.0.141:8080")
  .factory("response",["$resource","baseUrl",function ($resource,baseUrl) {
    var phone = function (phone,password) {
      return $resource(baseUrl+"/wechat/signIn",{username:phone,password:password});
    };
    return {
      phone:phone
    }
  }])
;

