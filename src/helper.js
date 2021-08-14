import axios from "axios";

/* function to flatten the object

e.g. for the input object of   
    {
      "street": {
        "number": 3323,
        "name": "Grüner Weg"
      },
      "city": "Großbreitenbach",
      "state": "Sachsen-Anhalt",
      "country": "Germany",
      "postcode": 84399,
      "coordinates": {
        "latitude": "-52.2904",
        "longitude": "116.4174"
      },
      "timezone": {
        "offset": "+11:00",
        "description": "Magadan, Solomon Islands, New Caledonia"
      }
    }
 
    the returned flattened object will be:
    {       
      "number": 3323,
      "name": "Grüner Weg"
      "city": "Großbreitenbach",
      "state": "Sachsen-Anhalt",
      "country": "Germany",
      "postcode": 84399,
      "latitude": "-52.2904",
      "longitude": "116.4174"
      "offset": "+11:00",
      "description": "Magadan, Solomon Islands, New Caledonia"
    }  
*/

function flattenedObject(obj) {
  if (!obj) return null;
  let flattened = {};
  const keys = Object.keys(obj);

  keys.forEach(k => {
    flattened = (typeof (obj[k]) !== "object") ?
      { ...flattened, [k]: obj[k] }
      : { ...flattened, ...flattenedObject(obj[k]) }
  })

  return flattened;
}


/* function to feth users information from API and abstract flattened locations */

async function getFlattenedUsersLocations() {
  try {
    const userRes = await axios.get("https://randomuser.me/api/?results=20");
    const usersList = userRes.data.results;
    const flattenedLocations = usersList.map(user => flattenedObject(user.location));
    return flattenedLocations;
  }
  catch (e) {
    console.log(e);
  }
}


export { getFlattenedUsersLocations}
