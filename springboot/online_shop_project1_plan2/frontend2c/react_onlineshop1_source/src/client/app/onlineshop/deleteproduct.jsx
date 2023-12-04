import React from 'react';
import { render } from 'react-dom';
import { Routes, Route, Link } from 'react-router-dom';


export default class DeleteProduct extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            productUUID: props.match.params.productUUID,
        }
    }

    componentWillMount() { }

    render() {

        return (
            <div>
                <Link to="/">Back to product list</Link>
                <br /> Delete product : {this.state.productUUID}
            </div>
        );
    }


}