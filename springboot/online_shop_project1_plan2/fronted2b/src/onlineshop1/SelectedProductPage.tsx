
import * as React from 'react';
import { Routes, Route, useParams, Link } from 'react-router-dom';


function SelectedProductPage(){

    let { productUUID } = useParams();

    return (<div> <Link to="/">Back to product list</Link> <br/>Selected Product Page with params : {productUUID}</div>);

}


export default SelectedProductPage;