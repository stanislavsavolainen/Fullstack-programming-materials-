var angularJSApplication = angular.module("angular-createProductModule", []);

angularJSApplication.run(function ($rootScope) {
    $rootScope.globalProductType = [{ type: 0, name: "All types" }];
    $rootScope.selectedProductType = 0;
});

angularJSApplication.controller("angular-createProductController", function ($scope, $http, $rootScope) {

    let categoriesArrays = [];

    $http.get("/categories").then(function (response) {

        response.data.forEach(function (ajaxProductCategoryElement) {

            let categoryObject = {
                id: ajaxProductCategoryElement.id,
                type: ajaxProductCategoryElement.productType,
                name: ajaxProductCategoryElement.productCategoryName,
                ptype: ajaxProductCategoryElement.productParrentType,
                pname: ajaxProductCategoryElement.productParrentCategoryName,

            }

            categoriesArrays.push(categoryObject);

        });

        $rootScope.globalProductType = $rootScope.globalProductType.concat(categoriesArrays);

    });

    $scope.createProductButtonCallback = function () {

        let data = {
            paramProductName : $scope.txProductName,
            paramProductType : $rootScope.selectedProductType,
            paramProductDescription: $scope.txProductDescription,
            paramProductQuantity: 10,
            paramProductPricePerUnit: $scope.txProductPrice,
            paramProductShippingPriceSameCountry: "56.75",
            paramProductShippingPriceEurope: "56.75",
            paramProductShippingPriceWorld: "56.75",
			paramProductShippingInfo: "I trade EU or schengen contries only, please check...",
            paramProductQualityScore: "1.0",
            paramProductSellerQualityScore: "1.0",
            paramProductBuyerQualityityScore: "1.0",
            paramProductImageUrl: "/productimages/placeholder1.png"
        };
        
        $http.post("/product" , JSON.stringify(data) ).then(function(response){
            console.log("Create product button clicked, result :" )
            console.log(response);

            alert("Product successfully created");
            location.reload();
        })

    }

});

angularJSApplication.controller("angular-selectProductByType", function ($scope, $http, $rootScope) {

    setTimeout(function () {
        $scope.agproductType = $rootScope.globalProductType;
        $scope.$apply(); //update angulaJs scope after ajax call for html rendering
        $('#prodcategory2').val(0);
    }, 1000);

    $scope.changeProductType = function () {
        $rootScope.selectedProductType = $scope.sProductType2; 
    }

});
