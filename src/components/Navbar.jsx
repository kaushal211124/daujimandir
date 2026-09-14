import { useState, useEffect } from "react";
import { Menu, X, Languages } from "lucide-react";
import { useLang } from "../context/LanguageContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang, t } = useLang();

  const links = [
    { name: t.home, id: "home" },
    { name: t.about, id: "about" },
    { name: t.mela, id: "mela" },
    { name: t.gallery, id: "gallery" },
    { name: t.donate, id: "donate" },
    { name: t.contact, id: "contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // मेनू खुला हो तो body scroll बंद
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className={scrolled ? "navbar scrolled" : "navbar"}>
      <a href="#home" className="logo" onClick={() => setOpen(false)}>
        <span className="om">🕉️</span>
        <span className="logo-text">{t.templeName}</span>
      </a>

      <ul className={open ? "nav-links open" : "nav-links"}>
        {links.map((l) => (
          <li key={l.id}>
            <a href={`#${l.id}`} onClick={() => setOpen(false)}>
              {l.name}
            </a>
          </li>
        ))}

        <li className="lang-item-mobile">
          <button className="lang-btn" onClick={toggleLang}>
            <Languages size={18} />
            <span>{lang === "hi" ? "English" : "हिंदी"}</span>
          </button>
        </li>
      </ul>

      <div className="nav-right">
        <button className="lang-btn desktop-lang" onClick={toggleLang}>
          <Languages size={18} />
          <span>{lang === "hi" ? "English" : "हिंदी"}</span>
        </button>

        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </nav>
  );
}