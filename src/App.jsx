import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuickActions from "./components/QuickActions";
import Footer from "./components/Footer";

import ItemsGrid from "./pages/ItemsGrid";
import LostForm from "./pages/LostForm";
import FoundForm from "./pages/FoundForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import './App.css';


export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <QuickActions />
              </>
            }
          />
          <Route path="/items" element={<ItemsGrid />} />
          <Route path="/report-lost" element={<LostForm />} />
          <Route path="/report-found" element={<FoundForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
