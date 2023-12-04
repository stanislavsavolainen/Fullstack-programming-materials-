import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, NavLink } from 'react-router-dom';

import NavigationBar from './navigationbar.jsx';

//./node_modules/.bin/webpack -d 

export default class ProductsList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			products: [],
			filteredProducts : [],
			productType : 0
		}

		this.changeProductType = this.changeProductType.bind(this);
	}

	componentWillMount() {
		this.loadAllProducts();

		//setTimeout( () => {  
		//	this.setState(this.state);
		//	console.log(" product list -> trigger update")
		//}, 500);


	}

	loadAllProducts() {

		//this.state.filteredProducts = products;

		fetch("http://127.0.0.1:8081/products")
			.then((resp) => {
				return resp.json();
			})
			.then((products) => {
				this.state.products = products;
				this.state.filteredProducts = products;
				this.setState(this.state);
			})
			.catch(function (error_msg) {
				// error if connection problem happens 
				console.log("Fetch error : " + error_msg);
			})

	}

	changeProductType(event) {

		console.log("Selected product "+event.target.value);

		let optionNumberValue = parseInt(event.target.value);
		this.state.productType = optionNumberValue;
		this.setState(this.state);

		//displayProductsListUI(productJSONArrayParam, optionNumberValue);
	}

	
	displayProductsListUI( productJSONArrayParam, selectionParam ) {

		let filteredProducts = productJSONArrayParam.filter((productElement) => productElement.productType == selectionParam)
		if (selectionParam == 0) filteredProducts = productJSONArrayParam;
		
		console.log("displayProductsListUI() - function triggered !");

		//let ParseredProductData = productJSONArrayParam.map((val: any, index: any) => {
		let ParseredProductData = filteredProducts.map((val, index) => {

			console.log("product element " + index + " : ");
			console.log(val);
			
			let selectedProductLink = "/product/" + val.productUUID;
			let imageLink = "/productimage/" + val.productUUID;
			let editLink = "/editproduct/" + val.productUUID;
 			let deleteLink = "/deleteproduct/" + val.productUUID;

			return (

				<div className="col-xs6 col-sm-4 productcardblock1">

					<div>
						<img src="placeholder1.png" className="imageblock1" />
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

	render() {

		let parentSelectedOption =  this.state.productType;

		return (
			<div>
				<NavigationBar changePropsProductType={this.changeProductType}></NavigationBar>
				{ this.displayProductsListUI( this.state.filteredProducts, parentSelectedOption )}
			</div>
		);

	}

}

