import React from 'react';

const GenderSelect = (props) => {
    return (
        <select value={props.value} onChange={props.change}>
            <option value="">wszystkie</option>
            <option value="female">kobieta</option>
            <option value="male">mężczyzna</option>
        </select>
    )
};

export default GenderSelect;