import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const EarthquakeContext = createContext();

const EarthquakeProvider = ({ children }) => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [filteredEarthquakes, setFilteredEarthquakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchEarthquakes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson`,
        { params: { limit: 50, offset: (page - 1) * 50 } }
      );
      const newEarthquakes = response.data.features;
      setHasMore(newEarthquakes.length === 50);
      setEarthquakes([...earthquakes, ...newEarthquakes]);
      setFilteredEarthquakes([...earthquakes, ...newEarthquakes]);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const filterEarthquakes = (magnitude) => {
    const filtered = earthquakes.filter(
      (eq) => eq.properties.mag >= magnitude
    );
    setFilteredEarthquakes(filtered);
  };

  useEffect(() => {
    fetchEarthquakes();
  }, []);

  const value = {
    earthquakes,
    filteredEarthquakes,
    filterEarthquakes,
    loading,
    error,
    hasMore,
  };

  return (
    <EarthquakeContext.Provider value={value}>
      {children}
    </EarthquakeContext.Provider>
  );
};

export { EarthquakeContext, EarthquakeProvider };