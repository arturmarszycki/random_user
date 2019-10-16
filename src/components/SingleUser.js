import React from 'react';

const SingleUser = (props) => {
    return (
        <li>
            <div className="thumbnail">
                <img src={props.picture} alt=""/>
            </div>
            <div className="info">
                <p>{props.first}&nbsp;{props.last}</p>
                <span>wiek:&nbsp;{props.age}</span>
                <p>{props.nat}</p>
            </div>
        </li>
    )
};

export default SingleUser;