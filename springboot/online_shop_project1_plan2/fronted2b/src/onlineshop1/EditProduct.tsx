import * as React from 'react';
import { Routes, Route, useParams, Link } from 'react-router-dom';

function EditProduct(){

    let { productUUID } = useParams();

    return (<div> <Link to="/">Back to product list</Link> <br/> Edit product : {productUUID}</div>);

}


export default EditProduct;