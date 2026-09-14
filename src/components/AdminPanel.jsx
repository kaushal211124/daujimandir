// src/components/AdminPanel.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Search, X } from "lucide-react";

export default function AdminPanel({ onLogout }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replies, setReplies] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | pending | replied

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "contact_messages"),
      (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        msgs.sort(
          (a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)
        );
        setMessages(msgs);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleReply = async (id) => {
    const replyText = replies[id];
    if (!replyText?.trim()) return alert("कृपया जवाब लिखें");
    try {
      await updateDoc(doc(db, "contact_messages", id), {
        adminReply: replyText,
        repliedAt: new Date(),
      });
      setReplies({ ...replies, [id]: "" });
      alert("✅ जवाब सेव हो गया");
    } catch (err) {
      console.error(err);
      alert("❌ जवाब सेव नहीं हो सका");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("क्या आप यह संदेश हटाना चाहते हैं?")) return;
    try {
      await deleteDoc(doc(db, "contact_messages", id));
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Search + Filter logic
  const filteredMessages = messages.filter((msg) => {
    const searchLower = search.toLowerCase().trim();
    const matchesSearch =
      !searchLower ||
      msg.name?.toLowerCase().includes(searchLower) ||
      msg.phone?.toLowerCase().includes(searchLower) ||
      msg.email?.toLowerCase().includes(searchLower) ||
      msg.message?.toLowerCase().includes(searchLower);

    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && !msg.adminReply) ||
      (filter === "replied" && msg.adminReply);

    return matchesSearch && matchesFilter;
  });

  // ✅ Counts
  const totalCount = messages.length;
  const pendingCount = messages.filter((m) => !m.adminReply).length;
  const repliedCount = messages.filter((m) => m.adminReply).length;

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>📋 Contact Messages ({totalCount})</h2>
        <button onClick={onLogout} className="logout-btn">
          लॉगआउट
        </button>
      </div>

      {/* ✅ Search Bar */}
      {!loading && messages.length > 0 && (
        <div className="admin-controls">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="नाम, फोन, ईमेल या संदेश से खोजें..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* ✅ Filter Tabs */}
          <div className="filter-tabs">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              सभी ({totalCount})
            </button>
            <button
              className={filter === "pending" ? "active" : ""}
              onClick={() => setFilter("pending")}
            >
              बिना जवाब ({pendingCount})
            </button>
            <button
              className={filter === "replied" ? "active" : ""}
              onClick={() => setFilter("replied")}
            >
              जवाब दिया ({repliedCount})
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p>लोड हो रहा है...</p>
      ) : messages.length === 0 ? (
        <p>अभी कोई संदेश नहीं आया।</p>
      ) : filteredMessages.length === 0 ? (
        <p>कोई संदेश नहीं मिला।</p>
      ) : (
        <div className="messages-list">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`message-card ${msg.adminReply ? "replied" : ""}`}
            >
              <p>
                <strong>नाम:</strong> {msg.name}
              </p>

              {msg.phone && (
                <p>
                  <strong>फोन:</strong> {msg.phone}
                </p>
              )}

              {msg.email && (
                <p>
                  <strong>ईमेल:</strong> {msg.email}
                </p>
              )}

              <p>
                <strong>संदेश:</strong> {msg.message}
              </p>

              <p className="timestamp">
                {msg.timestamp?.toDate().toLocaleString("hi-IN")}
              </p>

              {msg.adminReply && (
                <div className="saved-reply">
                  <strong>आपका जवाब:</strong> {msg.adminReply}
                </div>
              )}

              <div className="reply-actions">
                {msg.phone && (
                  <>
                    <a
                      href={`https://wa.me/91${msg.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="reply-whatsapp"
                    >
                      💬 WhatsApp
                    </a>
                    <a href={`tel:+91${msg.phone}`} className="reply-call">
                      📞 कॉल
                    </a>
                  </>
                )}

                {msg.email && (
                  <a
                    href={`mailto:${msg.email}?subject=श्री दाऊजी मंदिर - आपके संदेश का उत्तर`}
                    className="reply-email"
                  >
                    ✉️ Email
                  </a>
                )}

                <button
                  onClick={() => handleDelete(msg.id)}
                  className="delete-btn"
                >
                  🗑️ हटाएँ
                </button>
              </div>

              <textarea
                placeholder="यहाँ जवाब लिखें..."
                value={replies[msg.id] || ""}
                onChange={(e) =>
                  setReplies({ ...replies, [msg.id]: e.target.value })
                }
                className="admin-reply-input"
              />
              <button
                onClick={() => handleReply(msg.id)}
                className="save-reply-btn"
              >
                💾 जवाब सेव करें
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}