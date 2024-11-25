
var angularJSApplication = angular.module("angular-displaySelectedProduct", []);

angularJSApplication.controller("angular-getSelectedProduct", function ($scope, $http) {

    const currentUrl = window.location.href;
    let urlToProduct = currentUrl.split("?");

    console.log("parse url of selected product :")
    console.log(urlToProduct);

    $http.get("/product/" + urlToProduct[1]).then(function (response) {
        $scope.ajaxResponse = response.data;
    });

    $scope.calculateShippingFinalPriceAndDeliveryTime = function () {

        //handle shippment and get information from logistic companies

        // use buyerUUID from product wich track user location/home address for delivery
        // because each user have personal shipping route price and delivery delay

        //support also estimated delivery option for not registered anonymous user, for check

        // if product size and weight affect somehow on shipping price and delivery time ? think how to implement ...

        //convert base64 back to json after http-response in front-end side
        let rawHttpShippingData1 = atob($scope.ajaxResponse.shippingDataWareHouse);
        rawHttpShippingData1 = rawHttpShippingData1.replace(/\\/g, '');
        let rawHttpShippingData2 = JSON.parse(rawHttpShippingData1);

        setTimeout(function () {
       
            $scope.shippingData = rawHttpShippingData2;
            $scope.$apply(); //update angulaJs scope 
        
        }, 1000);
        
         //this fuction not returnig any value anymore. Now purpose is initialize shipping/delivey datamodel for visualisation 
        //return "product cannot be shipped";
    } 

    $scope.getShippmentFee = function () {
            let formatedPrice =  parseFloat($scope.shippingData.totalShippingPrice).toFixed(2);
            return formatedPrice;
    }

    $scope.getDeliveryTime = function () {
        return $scope.shippingData.totalLogisticDelayTimeInSeconds;
    }

    $scope.getShippingInfo = function () {
        return $scope.shippingData.totalShippingInfo;
    }


});


