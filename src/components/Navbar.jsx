
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">
          Lost & Found
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        {/* screen/desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link to="/">Home</Link>
          <Link to="/items">Items</Link>
          {user ? (
            <>
              <Link to="/report-lost">Report Lost</Link>
              <Link to="/report-found">Report Found</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col mt-3 space-y-2 md:hidden">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/items" onClick={() => setIsOpen(false)}>Items</Link>
          {user ? (
            <>
              <Link to="/report-lost" onClick={() => setIsOpen(false)}>Report Lost</Link>
              <Link to="/report-found" onClick={() => setIsOpen(false)}>Report Found</Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-red-500 px-3 py-1 rounded text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
