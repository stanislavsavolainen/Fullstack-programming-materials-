var angularJSApplication = angular.module("angular-ModifyProductModule", []);

angularJSApplication.controller("angular-ModifyProductController", function ($scope, $http, $rootScope) {

    let currentUrl = window.location.href;
    let urlToProduct = currentUrl.split("?");
    $scope.pageView = urlToProduct[2];

    $rootScope.deletioncommand={};
    
    $http.get("/product/" + urlToProduct[1]).then(function (response) {

        $scope.pageTitle = "";

        if (urlToProduct[2] == "edit") $scope.pageTitle = "Edit product ";
        else if (urlToProduct[2] == "delete") $scope.pageTitle = "Delete product ";
        else if (urlToProduct[2] == "image") $scope.pageTitle = "Upload image for product ";
        else $scope.pageTitle = "Unknown action for ";
        $scope.pageTitle += response.data.productUUID;

        $scope.productObject = {
            uuid: response.data.productUUID,
            name: response.data.productName,
            price: response.data.productPricePerUnit,
            description: response.data.productDescription,
            imgurl: response.data.productImageURL
        }

        $rootScope.respData = response.data;

    });

    $scope.uploadImageForProductButtonCallback = function() {

        console.log("uploadImageForProduct function triggered !")
        let sellerUUID = $rootScope.respData.sellerUUID;
        let productUUID = $rootScope.respData.productUUID;
        let imageBindingToProductFail = true;

        let formData = new FormData();
        formData.append('file' , fileupload.files[0]);

        fetch("/uploadProductImage", {
            method: "POST",
            body: formData
        }).then(function(response){
            return response.text();         
        }).then( function (parseredResponse){

            let jsonResponseObj = {};

            try{

                jsonResponseObj = JSON.parse(parseredResponse);
                console.log("/uploadProductImage response -> JSON PARSE = success");

                let SecondPostBody  = {
                    sellerUUID : sellerUUID,
                    productUUID : productUUID,
                    link : jsonResponseObj.link,
                    filename: jsonResponseObj.filename
                }

                console.log("/bindProductImageToSeller begin !");

                fetch("/bindProductImageToSeller", {
                    method: "POST",
                    body: JSON.stringify(SecondPostBody)
                }).then(function(response2){
                    console.log("/bindProductImageToSeller response done !");
                    imageBindingToProductFail = false;
                    //alert("Image successfully linked to right seller !");
                }).catch(function(error2){
                    //alert("failed link image to seller");
                    console.log("/bindProductImageToSeller response failed !");
                    imageBindingToProductFail = true;
                });

            } catch( e) {
                console.log("/uploadProductImage response -> JSON PARSE = fail : " + e);
            }
            
        }).catch(function(error){
            //alert("image upload failed");
            console.log("/uploadProductImage  image upload failed");
            let imageBindingToProductFail = true;
        })

        setTimeout( function(e) { 
            if(!imageBindingToProductFail) alert("Image successfully linked to right product !");
            else alert("Failed providing image to right product !"); 
        }, 1000);

    }

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

