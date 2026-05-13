import { useEffect, useMemo, useState } from "react";

export default function ItemsGrid() {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(6);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all | lost | found
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/items`);
        const data = await res.json();

        setItems(data);
      } catch (err) {
        console.error("Fetch items failed:", err.message);
      }
    })();
  }, []);


  const applySearch = () => {
    setSearchQuery(searchInput.trim());
    setVisible(6);
  };

  const filtered = useMemo(() => {
    let list = items;
    // type selection
    if (filter === "lost") list = list.filter((i) => i.type === "Lost");
    if (filter === "found") list = list.filter((i) => i.type === "Found");

    //search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((i) =>
        [i.title, i.description, i.last_seen, i.type, i.contact]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
      );
    }

    return list;
  }, [items, searchQuery, filter]);

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/items/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i._id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Delete failed");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const resolveItem = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/items/${id}/resolve`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((i) => (i._id === id ? { ...i, status: "resolved" } : i))
        );
      } else {
        const data = await res.json();
        alert(data.error || "Resolve failed");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const imgOf = (item) => {
    if (item.imageUrl) {
      console.log("Image URL from DB:", item.imageUrl); // 👀 Debug
      return item.imageUrl;
    }
    return `https://placehold.co/400x250?text=${encodeURIComponent(item.type || "Item")}`;
  };


  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Search + Filter Controls */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applySearch()}
          placeholder="Search by title, description, location..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={applySearch}
          className="bg-blue-500 px-3 py-1 rounded text-center text-white"
        >
          Search
        </button>
        {searchQuery && (
          <button
            onClick={() => {
              setSearchInput("");
              setSearchQuery("");
              setVisible(6);
            }}
            className="border px-4 rounded"
          >
            Clear
          </button>
        )}
      </div>

      
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1 rounded ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("lost")}
          className={`px-4 py-1 rounded ${filter === "lost" ? "bg-red-600 text-white" : "bg-gray-200"
            }`}
        >
          Lost Items
        </button>
        <button
          onClick={() => setFilter("found")}
          className={`px-4 py-1 rounded ${filter === "found" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
        >
          Found Items
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-3">
        Showing {Math.min(visible, filtered.length)} of {filtered.length} item(s)
        {searchQuery ? ` for “${searchQuery}”` : ""}.
      </p>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.slice(0, visible).map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow bg-white"
          >
            <img
              src={imgOf(item)}
              alt={item.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <span
                className={`text-xs px-2 py-1 rounded ${item.type === "Lost"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
                  }`}
              >
                {item.type}
              </span>
            </div>
            <p className="text-gray-700 mb-2">{item.description}</p>
            <p className="text-sm text-gray-600">Location: {item.last_seen}</p>
            <p className="text-sm text-gray-600">Contact: {item.contact}</p>
            <p className="text-xs text-gray-500 mt-1">Status: {item.status}</p>

            <div className="mt-3 flex flex-wrap gap-2">

              {currentUser && currentUser._id === item.userId && (
                <>
                  <button
                    onClick={() => resolveItem(item._id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Mark Resolved
                  </button>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* buttons - view  more and less  */}
      <div className="text-center mt-6 flex gap-4 justify-center">
        {visible < filtered.length && (
          <button
            onClick={() => setVisible((v) => v + 6)}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            View More
          </button>
        )}
        {visible > 6 && (
          <button
            onClick={() => setVisible((v) => Math.max(6, v - 6))}
            className="bg-gray-600 text-white px-5 py-2 rounded"
          >
            View Less
          </button>
        )}
      </div>

    </div>
  );
}
