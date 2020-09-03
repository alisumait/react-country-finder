import React, { Component, Fragment } from "react";
import AutocompleteSearchField from "../src/components/AutocompleteSearchField";
import HeroSection from "./components/HeroSection";
import CurrencyExchangeField from "./components/CurrencyExchangeField";
import "./App.css";
import { observer } from "mobx-react";
import { observable } from "mobx";

@observer
class App extends Component {
    @observable isFetchingResponse;
    @observable selectedCountry;
    @observable imageUrl = "";
    @observable selectedCurrency = {
        "name": "Swedish krona",
        "code": "SEK"
    };

    updateFetchingStatus = (status) => {
        this.isFetchingResponse = status;
    };

    updateImageUrl = (imageUrl) => {
        this.imageUrl = imageUrl;
    };

    updateCountry = (country) => {
        this.selectedCountry = country;
        this.selectedCurrency = {
            "name": country.currency,
            "code": country.currencyCode
        };
    };

    render() {
        const { updateImageUrl,
            updateCountry,
            updateFetchingStatus,
            isFetchingResponse,
            imageUrl,
            selectedCountry,
            selectedCurrency } = this;

        return (
            <div style={{ backgroundImage: "url(" + imageUrl + ")" }} className="app">
                <header className="app-header">
                    <AutocompleteSearchField updateImageUrl={updateImageUrl} updateFetchingStatus={updateFetchingStatus} updateCountry={updateCountry} />
                </header>
                <HeroSection updateCountry={updateCountry} selectedCountry={selectedCountry} isFetchingResponse={isFetchingResponse} />
                <CurrencyExchangeField selectedCurrency={selectedCurrency} />
            </div>
        );
    }
}

export default App;