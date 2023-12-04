import React from 'react';
import { render } from 'react-dom';

export default class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentWillMount() {

        console.log("Navigation bar -> componentWillMount()");

        this.loadAllCategories();

        setTimeout(() => {
            this.setState(this.state);
            console.log(" navigation bar -> trigger update")
        }, 500);
    }

    loadAllCategories() {

        console.log("Navigation bar -> loadAllCategories()");

        fetch("http://127.0.0.1:8081/categories")
            .then((resp) => {

                console.log("Navigation bar -> fetch 1 ");

                return resp.json();
            })
            .then((categories) => {

                console.log("Navigation bar -> fetch 2 ");

                this.state.categories = categories;
                this.setState(this.categories);
            })
            .catch(function (error_msg) {
                console.log("Navigation bar -> fetch -> fail ");
                // error if connection problem happens 
                console.log("Fetch error : " + error_msg);
            })

    }

    render() {

        console.log("Navigaion bar triggered ");
        console.log(this.state.categories);

        return (

            <div className="navibarblock1">
                <h1 className="navbarTitle">
                    React version of Stanislav online shop
                </h1>
                <br />
                <span className="beforeShopLogoSpace"></span>
                <img src="placeholder1.png" className="imageblock2" />
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

                        <select id="prodcategory" onChange={this.props.changePropsProductType}>
                                <option value="0" selected>All types</option>
                                {this.state.categories.map((val, index) => {

                                    console.log("category element " + index + ":");
                                    console.log(val);

                                    return (<option value={val.productType}> {val.productCategoryName} (type={val.productType}) </option>)
                                }
                                )}
                            </select>

                        </span>

                    </div>
                    <div className="col-xs6 col-sm-4"></div>
                </div>

            </div>

        );

    }



}