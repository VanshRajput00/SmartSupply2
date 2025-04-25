export default function SearchBar() {
    return (
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search for vegetables, fruits..."
          className="w-1/2 px-4 py-2 border border-green-700 rounded-l"
        />
        <button className="bg-green-700 text-white px-4 rounded-r">Search</button>
      </div>
    );
  }
  