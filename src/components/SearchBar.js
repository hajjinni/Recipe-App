function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="flex gap-2 w-full">
      <input
        type="text"
        placeholder="Search recipes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      <button
        onClick={onSearch}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
}

export default SearchBar;
