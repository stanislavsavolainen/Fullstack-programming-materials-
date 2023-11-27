
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShopStyles.css';
import NavBar from './ProductListNavigationBar';

const serverUrl = "http://192.168.100.12:8080/products"

function ProductsAjaxCall() {

    const [data, setData] = useState({ hits: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                serverUrl,
            );

            setData(result.data);
        };

        fetchData();
    }, []);

    return JSON.stringify(data);
}

function DisplayProductsListUI(productJSONArrayParam: any, selectionParam : Number ) {

    let filteredProducts = productJSONArrayParam.filter( (productElement : any) => productElement.productType == selectionParam )
    if(selectionParam == 0) filteredProducts = productJSONArrayParam;

    //let ParseredProductData = productJSONArrayParam.map((val: any, index: any) => {
    let ParseredProductData = filteredProducts.map((val: any, index: any) => {  

        let selectedProductLink = "/selectedproductpage2.html?" + val.productUUID;
        let imageLink = "/modifyproduct1.html?" +val.productUUID + "?image";
        let editLink = "/modifyproduct1.html?" +val.productUUID + "?edit";
        let deleteLink = "/modifyproduct1.html?" +val.productUUID + "?delete";

        return (

            <div className="col-xs6 col-sm-4 productcardblock1">

                <div>
                    <img src="http://localhost:3000/logo192.png" className="imageblock1" />
                </div>

                <div className="labelblock1">

                    <a href={selectedProductLink}>{val.productName}</a>

                    &emsp;
                    <a href={imageLink} title="upload image">
                        <span class="glyphicon glyphicon-picture titletext1"></span>
                    </a>

                    &nbsp;
                    <a href={editLink} title="edit">
                        <span className="glyphicon glyphicon-cog titletext1"></span>
                    </a>

                    &nbsp;
                    <a href={deleteLink} title="delete">
                        <span className="glyphicon glyphicon-trash titletext1"></span>
                    </a>

                </div>
                <div> {val.productDescription} </div>
                <div>

                    <span className="priceblock2" title="original price"> {val.productPricePerUnit} &#x20AC; </span>
                    <span className="priceblock1" title="(price offer -0% now)"> {val.productPricePerUnit} &#x20AC; </span>
                </div>

            </div>

        )

    });

    return ParseredProductData;
}

function DisplayAllPublicProducts() {

    let ProductJSONObject = JSON.parse("" + ProductsAjaxCall());
    let ProductJSONArray = Array.from(ProductJSONObject);
    const [selectedType, setSelectedType] = useState('');

    const handleTypeChange = (type : any) => {
        setSelectedType(type);
        parentSelectedOption = parseInt( selectedType);
    };

    return (
        <div>
            <NavBar onTypeChange={handleTypeChange} ></NavBar>
            {DisplayProductsListUI(ProductJSONArray , parentSelectedOption)}
        </div>);

}

export default DisplayAllPublicProducts;

