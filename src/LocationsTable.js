import React, { useState } from 'react';

const LocationsTable = ({ locations }) => {
  const [sortedLocations, setSortedLocations] = useState(locations);

  /* function to sort the locations by specifiy key */
  function soryBy(category) {
    setSortedLocations(
      (typeof (locations[0][category]) === "number") ?
        [...locations.sort((a, b) => a[category] - b[category])]
        : [...locations.sort((a, b) => a[category].localeCompare(b[category]))]
    )
  }

  return (
    <div className="LocationsTable">
      <table>
        <thead>
          <tr>
            {Object.keys(locations[0]).map(cate =>
              <th key={cate}>
                {cate}
                <button
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
    </div>
  )
}

export default LocationsTable;