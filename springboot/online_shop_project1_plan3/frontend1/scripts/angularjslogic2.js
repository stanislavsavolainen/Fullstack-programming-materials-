
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

        return "product cannot be shipped";
    }  

});




