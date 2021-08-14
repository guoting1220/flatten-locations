import React, { useState, useEffect } from 'react';
import { getFlattenedUsersLocations } from './helper';
import LocationsTable from './LocationsTable';
import './App.css';

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const loadLocations = async () => {
      const locations = await getFlattenedUsersLocations();
      setLocations(locations);
      setInfoLoaded(true);
    };

    loadLocations();
  }, []);

  if (!infoLoaded) return <p>Loading ..</p>;

  return (
    <div className="App">
      <h1>Locations</h1>
      <LocationsTable locations={locations} />
    </div>
  );
}

export default App;
