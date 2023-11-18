
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShopStyles.css';

const serverUrl = "http://192.168.100.12:8080/categories"

let selectedOption = 0;

function CategoryAjaxCall() {

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

interface ProductTypeProps {
    onTypeChange : ( data: string) => void;
}

function DisplayNavigationBarForProductListPage( { onTypeChange } : ProductTypeProps ) {

    const handleChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        const data = event.target.value;
        onTypeChange(data);
    };

    let CategoryJSONObject = JSON.parse("" + CategoryAjaxCall());

    let CategoryJSONArray = Array.from(CategoryJSONObject);

    return (

        <div className="navibarblock1">
            <h1 className="navbarTitle">
                React version of Stanislav online shop
            </h1>
            <br />
            <span className="beforeShopLogoSpace"></span>
            <img src="http://localhost:3000/logo192.png" className="imageblock2" />
            <input type="text" className="inputblock1" />
            <button className="buttonblock1 buttonblock2">Search</button>
            <span className="buttonMarginSpace " />
            <button className="buttonblock1 buttonblock2">Login</button>
            <span className="buttonMarginSpace " />
            <button className="buttonblock1 buttonblock2">Register</button>

            <div className="row">
                <div className="col-xs6 col-sm-4"></div>
                <div className="col-xs6 col-sm-4">

                    <span className="filterByCategoryDropDownMenuTitleText">

                        filter products by category :

                        <select id="prodcategory" onChange={handleChange} >
                        <option value="0" selected>All types</option>
                        { CategoryJSONArray.map((val: any, index: any) => { 
                            return ( <option value={val.productType}> {val.productCategoryName} (type={val.productType}) </option> ) } 
                        )}
                        </select>

                    </span>

                </div>
                <div className="col-xs6 col-sm-4"></div>
            </div>

        </div>

    );

}

export default DisplayNavigationBarForProductListPage;

