
import { Link } from "react-router-dom";

export default function QuickActions() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const cardClasses =
    "p-6 rounded-2xl shadow-md bg-white hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100";

  return (
    <section className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <Link to="/items" className={cardClasses}>
        <h3 className="font-semibold text-lg mb-2 text-blue-700">View All Items</h3>
        <p className="text-sm text-gray-600">Search and browse all lost & found items.</p>
      </Link>

      {user ? (
        <>
          <Link to="/report-lost" className={cardClasses}>
            <h3 className="font-semibold text-lg mb-2 text-red-700">Report Lost</h3>
            <p className="text-sm text-gray-600">Create a report for your lost item.</p>
          </Link>
          <Link to="/report-found" className={cardClasses}>
            <h3 className="font-semibold text-lg mb-2 text-green-700">Report Found</h3>
            <p className="text-sm text-gray-600">Help return an item you found.</p>
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className={cardClasses}>
            <h3 className="font-semibold text-lg mb-2 text-purple-700">Login</h3>
            <p className="text-sm text-gray-600">Sign in to post lost or found items.</p>
          </Link>
          <Link to="/signup" className={cardClasses}>
            <h3 className="font-semibold text-lg mb-2 text-orange-700">Create Account</h3>
            <p className="text-sm text-gray-600">It’s free and quick to get started.</p>
          </Link>
        </>
      )}
    </section>
  );
}
