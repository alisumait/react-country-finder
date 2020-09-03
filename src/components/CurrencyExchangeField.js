import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { getCurrencies } from "../services/api";

class CurrencyExchangeField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: {},
            date: "",
            fromAmount: "1",
            fromCurrency: this.props.selectedCurrency.code,
            toAmount: "1",
            toCurrency: "EUR",
        };
    }

    componentDidMount() {
        getCurrencies()
            .then((res) => {
                this.setState(
                    {
                        currencies: res.rates,
                        date: res.date,
                    },
                    () => {
                        this.updateExchange("fromAmount");
                    }
                );
            })
            .catch((error) => {
                throw Error(error.message);
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedCurrency !== prevProps.selectedCurrency) {
            this.setState(
                {
                    fromCurrency: this.props.selectedCurrency.code,
                },
                () => {
                    this.updateExchange("fromAmount");
                }
            );
        }
    }

    updateExchange(targetId) {
        const { currencies, fromCurrency, toCurrency, fromAmount, toAmount } = this.state;
        const allowed = [fromCurrency, toCurrency];
        const rate = Object.keys(currencies)
            .filter((key) => allowed.includes(key))
            .reduce((obj, key) => {
                obj[key] = currencies[key];
                return obj;
            }, {});

        const value =
            targetId == "toAmount"
                ? (toAmount * rate[fromCurrency]) / rate[toCurrency]
                : (fromAmount * rate[toCurrency]) / rate[fromCurrency];
        const propertyToUpdate = targetId == "toAmount" ? "fromAmount" : "toAmount";

        this.setState({
            [propertyToUpdate]: value.toFixed(4),
        });
    }

    onChange = (e) => {
        const targetId = e.target.id;
        this.setState({
            [targetId]: e.target.value,
        },
            () => {
                this.updateExchange(targetId);
            }
        );
    };

    renderCurrencies = (id) => {
        const { currencies, fromCurrency, toCurrency } = this.state;
        let suggestionsListComponent;

        if (Object.keys(currencies).length) {
            suggestionsListComponent = (
                <select
                    value={id == "toCurrency" ? toCurrency : fromCurrency}
                    className="text--normal exchange-selector"
                    onChange={this.onChange}
                    id={id}
                    name={id}
                >
                    {Object.keys(currencies).map((currency, index) => {
                        return <option key={index} value={currency}>{currency}</option>;
                    })}
                </select>
            );
        } else {
            suggestionsListComponent = (
                <select className="text--normal exchange-selector">
                    <option value="No currency">No currency</option>
                </select>
            );
        }
        return suggestionsListComponent;
    };

    render() {
        const {
            onChange,
            renderCurrencies,
            state: { fromAmount, toAmount, date },
        } = this;

        return (
            <Fragment>
                <div className="exchange-currencies-wrapper">
                    <div>
                        <input
                            type="number"
                            id={'fromAmount'}
                            placeholder={'Enter a number'}
                            className={'amount-input text--normal'}
                            autoFocus={true}
                            onChange={onChange}
                            value={fromAmount}
                        />
                        {renderCurrencies("fromCurrency")}
                    </div>

                    <div>
                        <input
                            type="number"
                            id={'toAmount'}
                            placeholder={'Enter a number'}
                            className={'amount-input text--normal'}
                            autoFocus={true}
                            onChange={onChange}
                            value={toAmount}
                        />
                        {renderCurrencies("toCurrency")}
                    </div>

                    <p className="subtitle text--normal">Last updated on: {date}</p>
                </div>
            </Fragment>
        );
    }
}

CurrencyExchangeField.propTypes = {
    selectedCurrency: PropTypes.object.isRequired,
};

export default CurrencyExchangeField;