import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;


export default function LostForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    contact: "",
    imageUrl: ""
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <p className="text-center mt-10 text-red-500">
        Please login to report a lost item.
      </p>
    );
  }

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/lost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Lost item reported!");
        navigate("/items");
      } else {
        alert(data.error || "Failed to report item");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6  bg-gray-50 rounded shadow mt-10"
    >
      <h2 className="text-2xl font-bold mb-4">Report Lost Item</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full mb-3 p-2 border rounded"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Last Seen Location"
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        name="contact"
        value={form.contact}
        onChange={handleChange}
        placeholder="Contact Number"
        className="w-full mb-3 p-2 border rounded"
      />
      
      <button
        type="submit"
        className="w-full bg-yellow-600 text-white py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
