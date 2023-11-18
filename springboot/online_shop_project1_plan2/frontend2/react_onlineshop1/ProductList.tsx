
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


function DisplayProductsListUI(productJSONArrayParam: any) {

    let ParseredProductData = productJSONArrayParam.map((val: any, index: any) => {
        return (


            <div className="col-xs6 col-sm-4 productcardblock1">

                <div>
                    <img src="http://localhost:3000/logo192.png" className="imageblock1" />
                </div>

                <div className="labelblock1">

                    <a href="/selectedproductpage2.html?{{productElement.uuid}}">{val.productName}</a>

                    &emsp;
                    <a href="/modifyproduct1.html?{{productElement.uuid}}?edit" title="edit">
                        <span className="glyphicon glyphicon-cog titletext1"></span>
                    </a>

                    &nbsp;
                    <a href="/modifyproduct1.html?{{productElement.uuid}}?delete" title="delete">
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


    return (
        <div>
            <NavBar></NavBar>
            {DisplayProductsListUI(ProductJSONArray)}
        </div>);

}



export default DisplayAllPublicProducts;
