import React from 'react';

interface ChildComponentProps {
    onTypeChange : ( data: string) => void;
}

const ChildComponent = ({ onTypeChange} : ChildComponentProps) => {

    const handleChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        const data = event.target.value;
        onTypeChange(data);
    };

    return (
        <select onChange={handleChange}>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
            <option value="type4">Type 4</option>
        </select>
    );



}

export default ChildComponent;

