import React, { useState } from 'react';
import SearchForm from './SearchForm';

const LocationsTable = ({ locations }) => {
  const NotSorted = "notSorted";
  const AscendingSorted = "AscendingSorted";
  const DscendingSorted = "DscendingSorted";

  const [sortedLocations, setSortedLocations] = useState(locations);

  const defaultSortedOrder = {};
  Object.keys(locations[0]).map(cate => defaultSortedOrder[cate] = NotSorted);

  const [sortedOrder, setSortedOrder] = useState(defaultSortedOrder);


  /* function to sort the locations by specifiy key */
  function soryBy(category) {
    if (sortedOrder[category] !== AscendingSorted) {
      setSortedLocations(
        (typeof (locations[0][category]) === "number") ?
          [...sortedLocations.sort((a, b) => a[category] - b[category])]
          : [...sortedLocations.sort((a, b) => a[category].localeCompare(b[category]))]
      )
      setSortedOrder({ ...defaultSortedOrder, [category]: AscendingSorted });
    }
    else if (sortedOrder[category] !== DscendingSorted) {
      setSortedLocations(
        (typeof (locations[0][category]) === "number") ?
          [...sortedLocations.sort((a, b) => b[category] - a[category])]
          : [...sortedLocations.sort((a, b) => b[category].localeCompare(a[category]))]
      )
      setSortedOrder({ ...defaultSortedOrder, [category]: DscendingSorted });
    }
  }

  function filterLocations(searchTerm) {
    setSortedLocations(locations);
    let filteredLocations = locations;
    for (let filterBy of Object.keys(searchTerm)) {
      if (searchTerm[filterBy]) {
        if (filterBy === "number" || filterBy === "postcode") {
          filteredLocations = filteredLocations.filter(l => l[filterBy] === +searchTerm[filterBy]);
        }
        else {
          filteredLocations = filteredLocations.filter(l => l[filterBy].toLowerCase().includes(searchTerm[filterBy].toLowerCase()));
        }
      }
    }
    setSortedLocations(filteredLocations);
  }

  const table = (sortedLocations.length === 0) ?
    <div>
      <p>No Location found!</p>
    </div>
    :
    <table>
      <thead>
        <tr>
          {Object.keys(locations[0]).map(cate =>
            <th key={cate} sorted={sortedOrder[cate]}>
              {cate}
              <button
                className="sortBtn"
                onClick={() => soryBy(cate)}>
                &#9660;
              </button>
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {sortedLocations.map((location, idx) =>
          <tr key={idx}>
            {Object.keys(location).map(cate =>
              <td key={cate}>{location[cate]}</td>
            )}
          </tr>
        )}
      </tbody>
    </table>


  return (
    <div className="LocationsTable">
      <SearchForm filterLocations={filterLocations} />
      {table}
    </div>
  )
}

export default LocationsTable;