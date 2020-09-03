export const getCountriesNames = (countryName) => fetch(`https://restcountries.eu/rest/v2/name/${countryName}?fields=name`, {method: "GET"})
  .then(handleErrors)
  .then(res => res.json());

export const getCountryDetails = (countryName) => fetch(`https://restcountries.eu/rest/v2/name/${countryName}?fullText=true&fields=capital;currencies;population`, {method: "GET"})
  .then(handleErrors)
  .then(res => res.json());

export const getCountryImage = (countryName) => fetch(`https://api.unsplash.com/search/photos?query=${countryName}%20city&orientation=landscape&client_id=J_ZurDxe9WLbP8DIDj8KXv61IbbnXjC-CXCpGdp_WLo`, {method: "GET"})
  .then(handleErrors)
  .then(res => res.json());

export const getCurrencies = () => fetch(`https://api.exchangerate.host/latest`, {method: "GET"})
  .then(handleErrors)
  .then(res => res.json());

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}