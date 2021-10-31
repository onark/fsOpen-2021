import React from "react";

const Filter = ({ filterValue, onFilterTextChange }) => {
    return (
      <form>
        <div>
          Filter:
            <input
            value={filterValue}
            onChange={onFilterTextChange} />
        </div>
      </form>
    )
  }

  export default Filter;
  