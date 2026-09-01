
import { useState } from "react";

function LiveSearch() {
  const [search, setSearch] = useState("");

  const names = [
    "Arpit",
    "Aakanksha",
    "Rahul",
    "Aman",
    "Rohit",
    "Priya",
    "Neha",
    "Vikas",
    "Anjali",
    "Karan",
    "Sneha"
  ];

  const filteredNames = names.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Live Search Filter</h2>

      <input
        type="text"
        placeholder="Search name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredNames.length > 0 ? (
          filteredNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))
        ) : (
          <p>No results found</p>
        )}
      </ul>
    </div>
  );
}

export default LiveSearch;
