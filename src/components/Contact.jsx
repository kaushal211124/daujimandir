import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_8179efi";
const EMAILJS_TEMPLATE_ID = "template_e6gh8p9";
const EMAILJS_PUBLIC_KEY = "sWfWyH-pyDwnotarN";

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    msg: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [emailStatus, setEmailStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEmailStatus("");

    if (!form.phone.trim() && !form.email.trim()) {
      setError(t.contactError);
      return;
    }

    try {
      // 1️⃣ Firestore में सेव करें
      await addDoc(collection(db, "contact_messages"), {
        name: form.name,
        phone: form.phone.trim() || null,
        email: form.email.trim() || null,
        message: form.msg,
        timestamp: serverTimestamp(),
        adminReply: null,
      });
      console.log("✅ Firestore में सेव हो गया");

      if (form.email.trim()) {
        try {
          console.log("📧 EmailJS भेज रहे हैं...");

          const result = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
              name: form.name,          
              email: form.email,        
              message: form.msg,      
            },
            EMAILJS_PUBLIC_KEY
          );

          console.log("✅ EmailJS Success:", result.status, result.text);
          setEmailStatus("✅ आपके ईमेल पर पुष्टि भेज दी गई है");
        } catch (emailErr) {
          console.error("❌ EmailJS Error:", emailErr);
          console.error("Status:", emailErr?.status);
          console.error("Text:", emailErr?.text);
          setEmailStatus(
            `⚠️ ईमेल नहीं भेजा जा सका: ${
              emailErr?.text || emailErr?.message || "Unknown error"
            }`
          );
        }
      } else {
        console.log("ℹ️ Email नहीं दिया गया, auto-reply skip किया");
      }

      setSent(true);
      setTimeout(() => {
        setSent(false);
        setEmailStatus("");
      }, 8000);

      setForm({ name: "", phone: "", email: "", msg: "" });
    } catch (err) {
      console.error("❌ Firestore Error:", err);
      setError("❌ संदेश भेजने में समस्या आई। कृपया बाद में प्रयास करें।");
    }
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
          />
          <input
            type="email"
            placeholder={t.emailPlaceholder}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            rows="4"
            placeholder={t.msgPlaceholder}
            value={form.msg}
            onChange={(e) => setForm({ ...form, msg: e.target.value })}
            required
          />

          <p className="contact-note">{t.contactNote}</p>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn-primary">
            {t.sendBtn}
          </button>

          {sent && <p className="success">{t.successMsg}</p>}

          {emailStatus && (
            <p
              className="success"
              style={{
                background: emailStatus.startsWith("✅")
                  ? "#e8f5e9"
                  : "#fff3e0",
                padding: "0.6rem 1rem",
                borderRadius: "8px",
                borderLeft: `4px solid ${
                  emailStatus.startsWith("✅") ? "#2e7d32" : "#ef6c00"
                }`,
                color: emailStatus.startsWith("✅") ? "#1b5e20" : "#e65100",
                fontSize: "0.9rem",
              }}
            >
              {emailStatus}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}