import { useLang } from "../context/LanguageContext";

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="section">
      <h2 className="section-title">{t.aboutTitle}</h2>
      <p className="section-sub">{t.aboutSub}</p>

      <div className="about-grid">
        <div className="about-text">
          <p>{t.aboutPara1}</p>
          <p>{t.aboutPara2}</p>
          <p>{t.aboutPara3}</p>

          <div className="about-stats">
            <div>
              <h3>165+</h3>
              <p>{t.stat4}</p>
            </div>
            <div>
              <h3>10</h3>
              <p>{t.stat2}</p>
            </div>
            <div>
              <h3>500K+</h3>
              <p>{t.stat3}</p>
            </div>
          </div>
        </div>

        <div className="about-img">
          <img
            src="https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800"
            alt="Shri Dauji Mandir, Jewar"
          />
        </div>
      </div>

      {/* ===== विरासत / इतिहास के मुख्य बिंदु ===== */}
      <div className="about-highlights">
        <div className="highlight-card">
          <span className="highlight-icon">🕉️</span>
          <h3>जावली ऋषि की तपोभूमि</h3>
          <p>
            जेवर नगरी प्राचीन काल से जावली ऋषि की तपस्या स्थली रही है, जहाँ
            यह पवित्र मंदिर स्थित है।
          </p>
        </div>

        <div className="highlight-card">
          <span className="highlight-icon">🙏</span>
          <h3>बाबा कालीचरण का स्वप्न</h3>
          <p>
            स्वप्न में दाऊजी महाराज के दर्शन के बाद बाबा कालीचरण जी ने खुदाई
            कर विग्रह प्रकट किया और मंदिर की स्थापना की।
          </p>
        </div>

        <div className="highlight-card">
          <span className="highlight-icon">📜</span>
          <h3>165+ वर्षों की परंपरा</h3>
          <p>
            वर्ष 1859 से निरंतर आयोजित होने वाला बलदेव छठ मेला, जो आज भी उसी
            श्रद्धा और उल्लास के साथ मनाया जाता है।
          </p>
        </div>

        <div className="highlight-card">
          <span className="highlight-icon">🎉</span>
          <h3>बलदेव छठ उत्सव</h3>
          <p>
            हर साल भाद्रपद मास में भगवान बलराम का जन्मोत्सव धूमधाम से मनाया
            जाता है, जो 10 दिनों तक चलता है।
          </p>
        </div>
      </div>
    </section>
  );
}