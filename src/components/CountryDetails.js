import React, { Fragment } from "react";
import PropTypes from "prop-types";
import CountryInfo from "./CountryInfo";
import City from "../resources/images/city.svg";
import Money from "../resources/images/money.svg";
import Population from "../resources/images/population.svg";

const CountryDetails = (props) => {
    const capital = props.selectedCountry.capital;
    const currency = props.selectedCountry.currency;
    const population = props.selectedCountry.population;

    return (
        <Fragment>
            <div className="country-details">
                <CountryInfo name="Capital" image={City} value={capital == "" ? "No capital" : capital} />
                <CountryInfo name="Currency" image={Money} value={currency} />
                <CountryInfo name="Population" image={Population} value={population} />
            </div>
        </Fragment>
    );
};

CountryDetails.propTypes = {
    selectedCountry: PropTypes.object.isRequired
}

export default CountryDetails;
