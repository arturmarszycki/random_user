import React from 'react';

const NationCheckbox = (props) => {
    let name = `country_${props.code}`;
    return (
        <label htmlFor={name}>
            <input type="checkbox" id={name} name={name} checked={props.checked} title={props.code} onChange={props.change}/>
            <span>{props.name}</span>
        </label>
    )
};

export default NationCheckbox;