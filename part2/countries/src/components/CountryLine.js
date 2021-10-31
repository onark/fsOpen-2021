import React, { useState } from "react";
import CountryDetails from './CountryDetails';

const CountryLine = ({ countryObj }) => {
    const [isMoreDetails, setIsMoreDetails] = useState(false);
    return (
      <div>
        {countryObj.name.common}
        <button onClick={() => setIsMoreDetails(!isMoreDetails)}>{!isMoreDetails ? 'More Details ' : 'Less Details ' }</button>
        { isMoreDetails && (
        <CountryDetails country = {countryObj}/>
        )}
      </div>
    )
  }
  
export default CountryLine;
