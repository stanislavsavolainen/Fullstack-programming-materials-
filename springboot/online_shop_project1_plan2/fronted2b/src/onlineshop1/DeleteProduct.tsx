import * as React from 'react';
import { Routes, Route, useParams, Link } from 'react-router-dom';

function DeleteProduct(){

    let { productUUID } = useParams();

    return (<div> <Link to="/">Back to product list</Link> <br/> Delete product : {productUUID}</div>);

}


export default DeleteProduct;