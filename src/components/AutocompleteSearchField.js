import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { getCountriesNames, getCountryImage, getCountryDetails } from "../services/api";

class AutocompleteSearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }

  onChange = (e) => {
    const userInput = e.currentTarget.value;
    let filteredSuggestions = ["No results"];
    this.setState({ userInput });

    getCountriesNames(userInput).then((res) => {
      filteredSuggestions = res.map((e) => e.name).filter((suggestion) => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1);

      this.setState({ activeSuggestion: 0, filteredSuggestions, showSuggestions: true });
    }).catch(() => {
      this.setState({ filteredSuggestions });
    });
  };

  onClick = (e) => {
    const { updateCountry, updateFetchingStatus, updateImageUrl } = this.props;
    const searchedText = e.target.innerText;
    let country = {};
    country["country"] = searchedText;

    getCountryImage(searchedText).then((res) => {
      updateImageUrl(res.results[0].urls["full"]);
    }).catch((error) => {
      throw Error(error.message);
    });

    getCountryDetails(searchedText).then((res) => {
      country["capital"] = res[0].capital || "No capital";
      country["currency"] = res[0].currencies[0].name || "No currency";
      country["currencyCode"] = res[0].currencies[0].code || "NA";
      country["population"] = res[0]
        .population
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "No population";
    }).then(() => {
      updateCountry(country);
      updateFetchingStatus(true);
    }).catch((error) => {
      throw Error(error.message);
    });

    this.setState({ activeSuggestion: 0, showSuggestions: false, userInput: e.currentTarget.innerText });
  };

  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({ activeSuggestion: 0, showSuggestions: false, userInput: filteredSuggestions[activeSuggestion] });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({
        activeSuggestion: activeSuggestion - 1
      });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({
        activeSuggestion: activeSuggestion + 1
      });
    }
  };

  handleFocusOut = () => {
    this.setState({ focus: false, showSuggestions: false });
  };

  handleFocus = () => {
    const { userInput } = this.state;
    this.setState({ focus: true, userInput, showSuggestions: true });
  };

  renderSearchList = () => {
    const {
      onClick,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <Fragment>
            <ul className="suggestions-list text--normal">
              {filteredSuggestions.map((suggestion, index) => {
                let className;
                index === activeSuggestion
                  ? className = "suggestion suggestion-active"
                  : className = "suggestion";

                return (
                  <li className={`${className}`} key={index} onMouseDown={onClick}>
                    {suggestion}
                  </li>
                );
              })}
            </ul>
          </Fragment>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>
              No suggestions, you 're on your own!</em>{" "}
          </div>
        );
      }
    }
    return suggestionsListComponent;
  };

  render() {
    const {
      onChange,
      onKeyDown,
      renderSearchList,
      handleFocus,
      handleFocusOut,
      state: {
        userInput
      }
    } = this;

    return (
      <Fragment>
        <div className="search-field-wrapper">
          <input
            type="text"
            placeholder={`E.g. Sweden`}
            className={`text--normal search-field ${focus
              ? "focus"
              : ""}`}
            autoFocus={true}
            onFocus={handleFocus}
            onBlur={handleFocusOut}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput} /> {userInput
              ? renderSearchList()
              : undefined}
        </div>
      </Fragment>
    );
  }
}

AutocompleteSearchField.propTypes = {
  updateCountry: PropTypes.func.isRequired,
  updateFetchingStatus: PropTypes.func.isRequired,
  updateImageUrl: PropTypes.func.isRequired
};

export default AutocompleteSearchField;