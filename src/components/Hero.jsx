import { useLang } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="home" className="hero">
      <div className="hero-overlay">
        <p className="hero-tag">{t.heroTag}</p>
        <h1>{t.heroTitle}</h1>
        <h2>{t.heroLocation}</h2>
        <p className="hero-sub">{t.heroSub}</p>
        <div className="hero-btns">
          <a href="#donate" className="btn-primary">
            {t.donateBtn}
          </a>
          <a href="#mela" className="btn-secondary">
            {t.melaBtn}
          </a>
        </div>
      </div>
    </section>
  );
}