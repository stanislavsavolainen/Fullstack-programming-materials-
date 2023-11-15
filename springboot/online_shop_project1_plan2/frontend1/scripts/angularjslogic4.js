var angularJSApplication = angular.module("angular-ModifyProductModule", []);

angularJSApplication.controller("angular-ModifyProductController", function ($scope, $http, $rootScope) {

    let currentUrl = window.location.href;
    let urlToProduct = currentUrl.split("?");
    $scope.pageView = urlToProduct[2];

    $rootScope.deletioncommand={};
    
    $http.get("/product/" + urlToProduct[1]).then(function (response) {

        if (urlToProduct[2] == "edit") $scope.pageTitle = "Editing product : " + response.data.productUUID;
        else if (urlToProduct[2] == "delete") $scope.pageTitle = "Delete product : " + response.data.productUUID;
        else $scope.pageTitle = "No action.";

        $scope.productObject = {
            uuid: response.data.productUUID,
            name: response.data.productName,
            price: response.data.productPricePerUnit,
            description: response.data.productDescription,
            imgurl: response.data.productImageURL
        }

        $rootScope.respData = response.data;

    });

    $scope.editProductButtonCallback = function () {

        console.log("angular-editProductCallback called !");

        $http.put("/product",  JSON.stringify($rootScope.respData)).then(function (response) {
           // alert("Product edit triggered /PUT params:" + JSON.stringify($rootScope.respData) + "RESPONSE : " + response.data);
           alert("Product : " + $rootScope.respData.productName + "(uuid="+$rootScope.respData.productUUID+") was successfully updated !");
        });

    }

    $scope.deleteProductButtonCallback = function () {

        console.log("angular-deleteProductCallback called ! param : " + $rootScope.deletioncommand.txConfirmDelete);

        if( $rootScope.deletioncommand.txConfirmDelete == "delete" || $rootScope.deletioncommand.txConfirmDelete == "Delete" || $rootScope.deletioncommand.txConfirmDelete == "DELETE"){
            //https://stackoverflow.com/questions/299628/is-an-entity-body-allowed-for-an-http-delete-request
            $http.delete("/product/"+$rootScope.respData.productUUID).then(function (response) {
                //alert("Product delete triggered /DELETE  params: " + JSON.stringify($rootScope.respData) + "RESPONSE : " + response.data);
                alert("Product : " + $rootScope.respData.productName + "(uuid="+$rootScope.respData.productUUID+") was successfully deleted !");
                window.location.replace("/productpage4.html");
            });
    
        } else {
            alert("Type : \"delete\" to confirm product deletion");
        }

    }

});

