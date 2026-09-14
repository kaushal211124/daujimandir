import { useLang } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3>🕉️ {t.templeName}</h3>
          <p>{t.footerTag}</p>
        </div>
        <div>
          <h4>{t.footerLinks}</h4>
          <ul>
            <li>
              <a href="#home">{t.home}</a>
            </li>
            <li>
              <a href="#about">{t.about}</a>
            </li>
            <li>
              <a href="#mela">{t.mela}</a>
            </li>
            <li>
              <a href="#donate">{t.donate}</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>{t.footerContact}</h4>
          <p>📞 +91-XXXXXXXXXX</p>
          <p>✉️ info@daojimandir.org</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {t.copyright}
        </p>
      </div>
    </footer>
  );
}