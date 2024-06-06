const Filter = ({ onFilterChange, onClear }) => {
  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Country Name"
        onChange={(e) => onFilterChange('name', e.target.value)}
      />
      <select onChange={(e) => onFilterChange('population', e.target.value)}>
        <option value="">Population</option>
        <option value="small">{'<'} 1M</option>
        <option value="medium">{'<'} 5M</option>
        <option value="large">{'<'} 10M</option>
      </select>
    </div>
  );
};

export default Filter;
