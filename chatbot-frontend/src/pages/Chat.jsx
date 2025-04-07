import { useState, useEffect, useRef } from "react";
import '../styles.css';
export default function Chat() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour, je suis votre assistant juridique. Posez votre question." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // Ajouter l'état de chargement
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true); // Lancer l'animation de chargement

    try {
      const response = await fakeBotResponse(input);
      const botMessage = { from: "bot", text: response };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false); // Arrêter l'animation une fois la réponse reçue
    } catch (err) {
      console.error(err);
      setLoading(false); // Arrêter l'animation en cas d'erreur
    }
  };

  const fakeBotResponse = async (text) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Ceci est une réponse simulée du bot juridique.");
      }, 1000);
    });
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#f3f4f6" }}>
      
      {/* Navbar */}
      <div style={{
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        backgroundColor: "#2563eb", 
        color: "#ffffff", 
        padding: "1rem", 
        borderRadius: "0 0 1rem 1rem"
      }}>
        {/* Avatar utilisateur */}
        <img
          src="/user_nav.jpg" // Ton image de l'utilisateur (mets-la dans public)
          alt="Utilisateur"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />
        
        {/* Nom du chatbot */}
        <h3 style={{ margin: "0", fontWeight: "bold", flex: 1, textAlign: "center" }}>Assistant Juridique</h3>
        
        {/* Icone ou bouton pour le menu */}
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#ffffff", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <span style={{ fontSize: "20px", color: "#2563eb" }}>≡</span> {/* Menu icon (hamburger icon) */}
        </div>
      </div>

      {/* Contenu du chat */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "flex-start",
              alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
              gap: "0.5rem",
              maxWidth: "75%"
            }}
          >
            {/* Avatar du bot */}
            {msg.from === "bot" && !loading && (
              <img
                src="/chat.png" // Ton image de bot (mets-la dans public)
                alt="Bot"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />
            )}
            {/* Avatar de l'utilisateur */}
            {msg.from === "user" && (
              <img
                src="/user.png" // Ton image d'utilisateur (mets-la dans public)
                alt="Utilisateur"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />
            )}

            <div
              style={{
                backgroundColor: msg.from === "user" ? "#2563eb" : "#d1d5db",
                color: msg.from === "user" ? "#ffffff" : "#000000",
                padding: "0.75rem 1rem",
                borderRadius: "1rem",
              }}
            >
              {msg.from === "bot" && loading ? (
                <div className="dots-container" style={{ fontSize: "1.5rem", display: "flex" }}>
                  <div className="dot" style={{ marginRight: "4px", animation: "dot-blink 1s infinite" }}></div>
                  <div className="dot" style={{ marginRight: "4px", animation: "dot-blink 1.2s infinite" }}></div>
                  <div className="dot" style={{ animation: "dot-blink 1.4s infinite" }}></div>
                </div>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Zone d'envoi */}
      <div style={{ padding: "0.5rem 1rem", borderTop: "1px solid #e5e7eb", backgroundColor: "#ffffff", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Écrivez votre question..."
          style={{
            flex: 1,
            padding: "0.5rem 1rem",
            border: "1px solid #d1d5db",
            borderRadius: "1rem",
            outline: "none",
            fontSize: "0.875rem", // Réduire la taille du texte
            maxWidth: "500px", // Limiter la largeur maximale de l'input
            width: "80%", // Rendre l'input plus compact
          }}
        />
        <button
          onClick={handleSend}
          style={{
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "1rem",
            cursor: "pointer",
            fontSize: "1rem",
            width: "50px", // Taille réduite du bouton
            height: "40px", // Taille réduite du bouton
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          ➤ {/* Flèche d'envoi */}
        </button>
      </div>
    </div>
  );
}
