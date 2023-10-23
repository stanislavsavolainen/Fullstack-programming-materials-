var angularJSApplication = angular.module("angular-displayPublicProduct", []);

// google -> angularjs share data between controllers (geeksforgeeks page)

angularJSApplication.run(function ($rootScope) {
    $rootScope.globalProductType = [{ type: 0, name: "All types" }];
    $rootScope.productsArray = [];
});

angularJSApplication.controller("angular-productList", function ($scope, $http, $rootScope) {

    console.log("angular controller -> productList")
    let responseArray = [];
    let responseArray2 = [];


    $http.get("/products").then(function (response) {

        response.data.forEach(function (ajaxProductElement) {

            productViewObject = {

                id: ajaxProductElement.id,
                name: ajaxProductElement.productName,
                type: ajaxProductElement.productType,
                image: ajaxProductElement.productImageURL,
                info: ajaxProductElement.productDescription,
                uuid: ajaxProductElement.productUUID,
                visible: 1

            };

            responseArray.push(productViewObject);
            console.log(ajaxProductElement);
            //$rootScope.globalProductType.push("" + productViewObject.type);

        });

        $rootScope.productsArray = responseArray;
        //console.log($rootScope.globalProductType);
        $scope.visval = 1;

    });
	
	
    $http.get("/categories").then(function (response) {

        response.data.forEach(function (ajaxProductCategoryElement) {

            let categoryObject = {
                id: ajaxProductCategoryElement.id,
                type: ajaxProductCategoryElement.productType,
                name: ajaxProductCategoryElement.productCategoryName,
                ptype: ajaxProductCategoryElement.productParrentType,
                pname: ajaxProductCategoryElement.productParrentCategoryName,

            }

            responseArray2.push(categoryObject);

        });


        $rootScope.globalProductType = $rootScope.globalProductType.concat(responseArray2);

    });
	
});

angularJSApplication.controller("angular-filterProductByType", function ($scope, $http, $rootScope) {

    console.log("filter product by type function triggered")

    setTimeout(function () {
        $scope.agproductType = $rootScope.globalProductType;
        $scope.$apply(); //update angulaJs scope after ajax call for html rendering
        $('#prodcategory').val(0);
    }, 1000);

    $scope.sProductType = "All types";

    $scope.changeProductType = function () {

        //$scope.sProductType
        let localProductTypesArray = [];


        if ($scope.sProductType == 0) {

            console.log("all visible types");

            $rootScope.productsArray.forEach(function (element) {

                if (element.visible != 1) element.visible = 1;

                localProductTypesArray.push(element);
            });

        } else {

            $rootScope.productsArray.forEach(function (element) {

                let tempType = "" + element.type;

                console.log("only one visible type");

                if ($scope.sProductType === tempType) {
                    element.visible = 1;
                } else {
                    element.visible = 0;
                }



                localProductTypesArray.push(element);

            });

        }

        $rootScope.productsArray = localProductTypesArray;

        //console.log("display product array status:")
        //console.log($rootScope.productsArray)
        //$scope.$apply(); 
        //$rootScope.$apply();   

    }


});

function removeDuplicates(data) {

    console.log("remove duplicate function triggered")

    let uniqueArray = [];

    data.forEach(function (element) {

        if (!uniqueArray.includes(element)) uniqueArray.push(element);

    });

    console.log(uniqueArray);

    return uniqueArray;
};

