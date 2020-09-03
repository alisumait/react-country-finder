import React from "react";

const CountryInfo = (props) => (
    <div className="info-card">
        <div className="info-details">
            <p className="text--normal info-label">{props.name}</p>
            <img src={props.image} className="info-image" />
            <p className="text--bolder info-value">{props.value}</p>
        </div>
    </div>
);

export default CountryInfo;