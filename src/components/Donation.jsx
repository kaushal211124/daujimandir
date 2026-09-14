import { useLang } from "../context/LanguageContext";

export default function Donation() {
  const { t } = useLang();

  return (
    <section id="donate" className="section alt donate">
      <h2 className="section-title">{t.donateTitle}</h2>
      <p className="section-sub">{t.donateSub}</p>

      <div className="donate-grid">
        <div className="qr-box">
          {/* public/qr.png में अपना QR रखें */}
          <img src="/qr.png" alt="UPI QR Code" />
          <p className="upi-id">
            <strong>{t.upiLabel}</strong> daujimandir@upi
          </p>
          <p className="qr-hint">{t.qrHint}</p>
        </div>

        <div className="bank-box">
          <h3>{t.bankTitle}</h3>
          <div className="bank-row">
            <span>{t.accName}</span>
            <b>Shri Dauji Mandir Trust</b>
          </div>
          <div className="bank-row">
            <span>{t.accNo}</span>
            <b>XXXXXXXXXXXX</b>
          </div>
          <div className="bank-row">
            <span>{t.ifsc}</span>
            <b>XXXXXXXXX</b>
          </div>
          <div className="bank-row">
            <span>{t.bank}</span>
            <b>State Bank of India</b>
          </div>
          <div className="bank-row">
            <span>{t.branch}</span>
            <b>Jewar</b>
          </div>
        </div>
      </div>
    </section>
  );
}