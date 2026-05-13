
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-4">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-map-marker-alt mr-2"></i>Contact Us
            </h4>
            <p className="mb-2">123 Main Street</p>
            <p className="mb-2">City, State 12345</p>
            <p>lostandfound@example.com</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-clock mr-2"></i>Hours
            </h4>
            <p>Mon-Fri: 9am-6pm</p>
            <p>Saturday: 10am-4pm</p>
            <p>Sunday: Admin Only</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-info-circle mr-2"></i>About
            </h4>
            <p>Helping reunite people with their lost items.</p>
            <div className="flex mt-4">
              <button className="mr-4 text-blue-400 hover:text-blue-300"><i className="fab fa-facebook-f"></i></button>
              <button className="mr-4 text-blue-400 hover:text-blue-300"><i className="fab fa-twitter"></i></button>
              <button className="text-blue-400 hover:text-blue-300"><i className="fab fa-instagram"></i></button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          
        </div>
      </div>
    </footer>
  );
}
