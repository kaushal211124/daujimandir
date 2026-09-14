import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLang } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", phone: "", msg: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", phone: "", msg: "" });
  };

  return (
    <section id="contact" className="section">
      <h2 className="section-title">{t.contactTitle}</h2>
      <p className="section-sub">{t.contactSub}</p>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="info-item">
            <MapPin className="icon" />
            <div>
              <h4>{t.addressLabel}</h4>
              <p>{t.addressText}</p>
            </div>
          </div>
          <div className="info-item">
            <Phone className="icon" />
            <div>
              <h4>{t.phoneLabel}</h4>
              <p>+91-XXXXXXXXXX</p>
            </div>
          </div>
          <div className="info-item">
            <Mail className="icon" />
            <div>
              <h4>{t.emailLabel}</h4>
              <p>info@daojimandir.org</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t.namePlaceholder}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder={t.phonePlaceholder}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <textarea
            rows="4"
            placeholder={t.msgPlaceholder}
            value={form.msg}
            onChange={(e) => setForm({ ...form, msg: e.target.value })}
            required
          />
          <button type="submit" className="btn-primary">
            {t.sendBtn}
          </button>
          {sent && <p className="success">{t.successMsg}</p>}
        </form>
      </div>
    </section>
  );
}