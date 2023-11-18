

function DisplayNavigationBarForProductListPage() {

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

                    <span className="filterByCategoryDropDownMenuTitleText" ng-controller="angular-filterProductByType" >
                        filter products by category :
                        <select id="prodcategory" ng-model="sProductType" ng-change="changeProductType()">
                            <option ng-repeat="typeElement in agproductType" value="{{typeElement.type}}">typeElement.name</option>
                        </select>

                    </span>
                </div>
                <div className="col-xs6 col-sm-4"></div>
            </div>

        </div>

    );

}

export default DisplayNavigationBarForProductListPage;

