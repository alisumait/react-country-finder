import React, { Fragment } from "react";
import CountryDetails from "./CountryDetails";

const HeroSection = (props) => (
    <Fragment>
        {(props.isFetchingResponse && <CountryDetails selectedCountry={props.selectedCountry} />) || (
            <div className="hero-section">
                <h1 className="headline text--bolder">Search for a country!</h1>
                <h4 className="subheader text--normal">&amp; exchange currency rates</h4>
            </div>
        )}
    </Fragment>
);

export default HeroSection;
