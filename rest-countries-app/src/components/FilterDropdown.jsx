function FilterDropdown({ onSelect }) {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      className="w-full p-3 rounded-lg border border-gray-300 mb-4"
    >
      <option value="">Filter by region</option>
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
}
export default FilterDropdown;
