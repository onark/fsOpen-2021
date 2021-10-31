import React from "react";

const CountryDetails = ({country}) => {
    return (
      <div>
        <h1 key={country.area}>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Region: {country.region}</p>
        <h3>Languages</h3>
        {Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>
        )}
        <h1>{country.flag}</h1>
      </div>
    )
  }

export default CountryDetails;

  
  