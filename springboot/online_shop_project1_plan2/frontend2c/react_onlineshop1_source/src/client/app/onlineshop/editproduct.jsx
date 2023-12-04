import React from 'react';
import { render } from 'react-dom';
import { Routes, Route, Link } from 'react-router-dom';


export default class EditProduct extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            productUUID: props.match.params.productUUID,
        }
    }

    componentWillMount() { }

    render() {

        //<br /> Selected Product Page with params : {this.state.productUUID}

        return (
            <div>
                <Link to="/">Back to product list</Link>
                <br /> Edit product : {this.state.productUUID}
            </div>
        );
    }


}