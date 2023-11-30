
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
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

    
    /*
    let data = [
        { id :1, productType:300, productCategoryName: "Soffa", productParrentType :300,productParrentCategoryName:"Furniture"},
        { id :2, productType:101, productCategoryName : "Desktops", productParrentType :100,productParrentCategoryName:"Computers"},
        {id:3,productType:102,productCategoryName:"Laptops",productParrentType:100,productParrentCategoryName:"Computers"},
        {id:4,productType:103,productCategoryName:"Tablet PC",productParrentType:100,productParrentCategoryName:"Computers"},
        {id:5,productType:104,productCategoryName:"MacBooks",productParrentType:100,productParrentCategoryName:"Computers"},
        {id:6,productType:105,productCategoryName:"iPads",productParrentType:100,productParrentCategoryName:"Computers"},
        {id:7,productType:302,productCategoryName:"Chair",productParrentType:300,productParrentCategoryName:"Furniture"},
        {id:8,productType:303,productCategoryName:"Table",productParrentType:300,productParrentCategoryName:"Furniture"},
        {id:9,productType:304,productCategoryName:"Shelf",productParrentType:300,productParrentCategoryName:"Furniture"},
        {id:10,productType:305,productCategoryName:"Wardrobe",productParrentType:300,productParrentCategoryName:"Furniture"},
        {id:11,productType:306,productCategoryName:"Clothers warddrobe",productParrentType:300,productParrentCategoryName:"Furniture"},
        {id:12,productType:307,productCategoryName:"Bed",productParrentType:300,productParrentCategoryName:"Furniture"},
        {id:13,productType:308,productCategoryName:"Kids bed",productParrentType:300,productParrentCategoryName:"Furniture"},
        {id:14,productType:401,productCategoryName:"Aloe vera",productParrentType:400,productParrentCategoryName:"Plants"},
        {id:15,productType:402,productCategoryName:"Cactus",productParrentType:400,productParrentCategoryName:"Plants"},
        {id:16,productType:403,productCategoryName:"Polyscians",productParrentType:400,productParrentCategoryName:"Plants"},
        {id:17,productType:403,productCategoryName:"Carnivorous plant",productParrentType:400,productParrentCategoryName:"Plants"}
    ]
    */

    return JSON.stringify(data);
}





function ChangeEvent(event: any) {

    selectedOption = event.target.value;

    console.log("drop-down menu selected option : " + selectedOption)

    //return selectedOption;
}

//export const getOption = () => {
//   return selectedOption;
//} 



interface ProductTypeProps {
    onTypeChange: (data: string) => void;
}



function DisplayNavigationBarForProductListPage({ onTypeChange }: ProductTypeProps) {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const data = event.target.value;
        console.log("handleChange option="+data);
        
        if(data=="0") {

            //$('#prodcategory option[value="300"]')
            //$('#prodcategory option[value="0"]')

            //$('#prodcategory').val('300');
            //$('#prodcategory').val('0');

            /*
            setTimeout(function () {

                $('#prodcategory').val('300');
                $('#prodcategory').trigger('change');

                //$('#prodcategory').on('change', 'input', function() {
                    // Does some stuff and logs the event to the console
                  //});

                setTimeout(function () {

                    $('#prodcategory').val('0');
                    $('#prodcategory').trigger('change');

                    //$('#prodcategory').on('change', 'input', function() {
                        // Does some stuff and logs the event to the console
                      //});
                
                } , 1000)

            } , 1000)

            */


        } else {
            //$('#prodcategory option[value="0"]')
            //$('#prodcategory option[value="'+data+'"]')

            //$('#prodcategory').val('0');
            //$('#prodcategory').val("'"+data+"'");

            //console.log( $('#prodcategory').val("'"+data+"'") );

            /*
            setTimeout(function () {

                $('#prodcategory').val('0');
                $('#prodcategory').trigger('change');

                //$('#prodcategory').on('change', 'input', function() {
                    // Does some stuff and logs the event to the console
                 // });

                setTimeout(function () {

                    $('#prodcategory').val(''+data);
                    $('#prodcategory').trigger('change');

                    //$('#prodcategory').on('change', 'input', function() {
                        // Does some stuff and logs the event to the console
                     // });
                
                } , 1000)

            } , 1000)
            */
        }

        


        onTypeChange(data);


        //alert("option selected : " + data)
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
                            {CategoryJSONArray.map((val: any, index: any) => { return (<option value={val.productType}> {val.productCategoryName} (type={val.productType}) </option>) })}

                        </select>

                    </span>
                </div>
                <div className="col-xs6 col-sm-4"></div>
            </div>

        </div>

    );
    //<option value="0" selected>All types</option>
    // <option ng-repeat="typeElement in agproductType" value="{{typeElement.type}}">typeElement.name</option>

}


export default DisplayNavigationBarForProductListPage;



