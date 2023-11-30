
import * as React from 'react';
import { Routes, Route, useParams, Link } from 'react-router-dom';

function AddImage(){

    //return (<div>Add image to product</div>);

    let { productUUID } = useParams();

    return (<div> <Link to="/">Back to product list</Link> <br/>Upload image to product, params : {productUUID}</div>);

}


export default AddImage;