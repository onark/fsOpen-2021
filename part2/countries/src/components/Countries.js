import React from "react";
import CountryDetails from './CountryDetails';
import CountryLine from './CountryLine';

const Countries = ({ countries, showDetails, inlineCountry }) => {
    if (countries.length > 10) {
      return (
        <p>Apply more specific filter. Too many matches!</p>
      )
    }
  
    if (countries.length === 1) {
      const country = countries[0];
      return (
        <CountryDetails country = {country}/>
      )
    }
  
    return (
      <div>
        <h2>Countries</h2>
        {countries.map(country =>
          <CountryLine countryObj={country} key={country.area + country.ccn3} showMore={showDetails} inlineCountry = {inlineCountry} />
        )}
      </div>
    )
  }

  export default Countries;