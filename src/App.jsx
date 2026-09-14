import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Mela from "./components/Mela";
import Gallery from "./components/Gallery";
import Donation from "./components/Donation";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
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