
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

        return "product cannot be shipped";
    }  

});




