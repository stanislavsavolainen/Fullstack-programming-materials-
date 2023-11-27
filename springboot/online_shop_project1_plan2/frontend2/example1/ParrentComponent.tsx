import React,  { useState} from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {

    const [selectedType, setSelectedType] = useState('');

    const handleTypeChange = (type : any) => {
        setSelectedType(type);
    };

    const products = [
        { name : "Product 1", type: "type1"},
        { name : "Product 2", type: "type2"},
        { name : "Product 3", type: "type1"},
        { name : "Product 4", type: "type3"}
    ];


    const filteredProduct = products.filter( product => product.type === selectedType);
    const productItems = filteredProduct.map( product => (
        <div key={product.name}>
            <p>{product.name}</p>
        </div>
    ))

    return (
        <div>
            <ChildComponent onTypeChange={handleTypeChange} />
            <p>Data from child compoenent : {selectedType} </p>
            <div>
                {productItems.length > 0 ? productItems : <p>No products found</p>}
            </div>
        </div>
    );

}

export default ParentComponent;

