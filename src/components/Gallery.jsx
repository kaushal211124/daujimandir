import { useLang } from "../context/LanguageContext";

export default function Gallery() {
  const { t } = useLang();

  const imgs = [
    {
      src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
      alt: "Temple",
    },
    {
      src: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800",
      alt: "Aarti",
    },
    {
      src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
      alt: "Mela",
    },
    {
      src: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800",
      alt: "Bhajan",
    },
    {
      src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
      alt: "Procession",
    },
    {
      src: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
      alt: "Diya",
    },
  ];

  return (
    <section id="gallery" className="section">
      <h2 className="section-title">{t.galleryTitle}</h2>
      <p className="section-sub">{t.gallerySub}</p>
      <div className="gallery-grid">
        {imgs.map((img, i) => (
          <div key={i} className="gallery-item">
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}