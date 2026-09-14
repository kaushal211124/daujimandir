// src/App.jsx
import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Mela from "./components/Mela";
import Gallery from "./components/Gallery";
import Donation from "./components/Donation";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel"; 
import { auth } from "./firebase"; 
import { signOut } from "firebase/auth"; 

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const isAdminRoute = window.location.hash === "#admin";

  const handleLogout = async () => {
    await signOut(auth);
    setIsAdmin(false);
  };

  if (isAdminRoute) {
    return isAdmin ? (
      <AdminPanel onLogout={handleLogout} />
    ) : (
      <AdminLogin onLogin={() => setIsAdmin(true)} />
    );
  }

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Mela />
        <Gallery />
        <Donation />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}