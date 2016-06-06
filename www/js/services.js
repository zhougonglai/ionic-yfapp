angular.module('starter.services', [])
  .constant("baseUrl","http://localhost:8100/")
  .factory("response",["$resource","baseUrl",function ($resource,baseUrl) {
    var phone = function (phone,key) {
      return $resource("/mobile/get",{phone:phone,key:key});
    };
    return {
      phone:phone
    }
  }])
;

