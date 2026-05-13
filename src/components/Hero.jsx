
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Lost Something? Found Something?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          We're here to reunite you with your belongings. Browse lost and found
          items, or submit a report to help others.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/*  to /report-lost */}
          <Link
            to="/report-lost"
            className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition transform hover:scale-105 shadow-lg inline-block"
          >
            <i className="fas fa-plus mr-2"></i>Report Lost Item
          </Link>

          {/* to /items */}
          <Link
            to="/items"
            className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition transform hover:scale-105 shadow-lg inline-block"
          >
            <i className="fas fa-search mr-2"></i>Search Items
          </Link>
        </div>
      </div>
    </section>
  );
}
