function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search for a country..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full p-3 rounded-lg border border-gray-300 mb-4"
    />
  );
}
export default SearchBar;
