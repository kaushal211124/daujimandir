import { useEffect, useState } from "react";
import { useLang } from "../context/LanguageContext";

export default function Mela() {
  const { t } = useLang();

  // 🎉 मेला प्रारंभ तिथि — भाद्रपद षष्ठी, 17 सितंबर 2026, दोपहर 12:00 बजे
  const melaDate = new Date("2026-09-17T12:00:00");

  // मेला 10 दिन चलेगा — 17 सितंबर से 26 सितंबर 2026 तक
  const melaEndDate = new Date("2026-09-26T23:59:59");

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = melaDate - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const now = new Date();
  const isMelaStarted = now >= melaDate && now <= melaEndDate;
  const isMelaEnded = now > melaEndDate;

  const items = [
    { label: t.days, value: timeLeft.days },
    { label: t.hours, value: timeLeft.hours },
    { label: t.minutes, value: timeLeft.minutes },
    { label: t.seconds, value: timeLeft.seconds },
  ];

  return (
    <section id="mela" className="section alt">
      <h2 className="section-title">{t.melaTitle}</h2>
      <p className="section-sub">{t.melaSub}</p>

      {/* ====== काउंटडाउन / मेला शुरू / मेला समाप्त ====== */}
      {isMelaEnded ? (
        <div className="mela-started mela-ended">
          <h3>🙏 मेला संपन्न हुआ 🙏</h3>
          <p>श्री दाऊजी महाराज का जन्मोत्सव संपन्न हुआ — आपके सहयोग के लिए धन्यवाद</p>
          <p className="mela-dates">17 सितंबर 2026 — 26 सितंबर 2026</p>
        </div>
      ) : isMelaStarted ? (
        <div className="mela-started">
          <h3>🎉 मेला शुरू हो गया है! 🎉</h3>
          <p>श्री दाऊजी महाराज का जन्मोत्सव मनाया जा रहा है</p>
          <p className="mela-dates">17 सितंबर 2026 — 26 सितंबर 2026</p>
        </div>
      ) : (
        <>
          <p className="countdown-label">
            ⏳ मेला प्रारंभ होने में शेष समय
          </p>
          <div className="countdown">
            {items.map((it) => (
              <div key={it.label} className="count-box">
                <span className="count-num">
                  {String(it.value).padStart(2, "0")}
                </span>
                <span className="count-label">{it.label}</span>
              </div>
            ))}
          </div>
          <p className="mela-dates">17 सितंबर 2026 — 26 सितंबर 2026</p>
        </>
      )}

      {/* ====== मेला जानकारी कार्ड्स ====== */}
      <div className="mela-info">
        <div className="mela-card">
          <h3>{t.melaDuration}</h3>
          <p>{t.melaDurationText}</p>
        </div>

        {/* <div className="mela-card">
          <h3>{t.melaLocation}</h3>
          <p>{t.melaLocationText}</p>
        </div> */}

        <div className="mela-card">
          <h3>{t.melaAttraction}</h3>
          <p>{t.melaAttractionText}</p>
        </div>

        <div className="mela-card">
          <h3>{t.melaNight}</h3>
          <p>{t.melaNightText}</p>
        </div>

        <div className="mela-card">
          <h3>{t.melaLastDay}</h3>
          <p>{t.melaLastDayText}</p>
        </div>
      </div>
    </section>
  );
}