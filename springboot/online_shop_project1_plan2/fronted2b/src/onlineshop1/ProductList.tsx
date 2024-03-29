
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
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

        let selectedProductLink = "/product/"+val.productUUID;
        let imageLink = "/productimage/" + val.productUUID;
        let editLink = "/editproduct/" + val.productUUID;
        let deleteLink = "/deleteproduct/" + val.productUUID;

        return (

            <div className="col-xs6 col-sm-4 productcardblock1">

                <div>
                    <img src="http://localhost:3000/logo192.png" className="imageblock1" />
                </div>

                <div className="labelblock1">

                    <Link to={selectedProductLink}>{val.productName}</Link>
                    
                    &emsp;
                    <Link to={imageLink}><span className="glyphicon glyphicon-picture titletext1"></span></Link>

                    &nbsp;
                    <Link to={editLink}><span className="glyphicon glyphicon-cog titletext1"></span></Link>

                    &nbsp;
                    <Link to={deleteLink}><span className="glyphicon glyphicon-trash titletext1"></span></Link>

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

