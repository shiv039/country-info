import { useState, useEffect } from 'react';
import { fetchCountries } from './services/api';
import CountryTable from './components/countryTable';
import Filter from './components/filter';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState({ name: '', population: '' });

  useEffect(() => {
    const getData = async () => {
      const result = await fetchCountries();
      setCountries(result);
      setFilteredCountries(result);
    };
    getData();
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(country => {
        const matchesName = country.name.toLowerCase().includes(filter.name.toLowerCase());
        const matchesPopulation = 
          (filter.population === 'small' && country.population < 1000000) ||
          (filter.population === 'medium' && country.population < 5000000) ||
          (filter.population === 'large' && country.population < 10000000) ||
          !filter.population;
        return matchesName && matchesPopulation;
      })
    );
  }, [filter, countries]);

  const handleFilterChange = (type, value) => {
    setFilter(prevFilter => ({ ...prevFilter, [type]: value }));
  };

  const handleClear = () => {
    setFilter({ name: '', population: '' });
  };

  return (
    <div className="app">
      <h2 className="header">Countries Info</h2>
      <div className="controls">
        <div className="left-controls">
          <Filter onFilterChange={handleFilterChange} />
          <button onClick={handleClear} className="clear-btn">Clear</button>
        </div>
        <button onClick={handleClear} className="show-all-btn">Show all Countries</button>
      </div>
      <CountryTable data={filteredCountries} />
    </div>
  );
};

export default App;
