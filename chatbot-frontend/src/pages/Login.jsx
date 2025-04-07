import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Partie pour test sans backend (à supprimer plus tard)
    if (!email || !password) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
    console.log("Connexion simulée avec :", email, password);
    navigate("/chat");

    // === Logique réelle à décommenter quand l'API est prête ===
    /*
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Exemple : stockage d'un token si fourni
        // localStorage.setItem("token", data.token);
        navigate("/chat");
      } else {
        setError(data.message || "Identifiants incorrects.");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
    */
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f3f4f6"
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        padding: "2rem",
        borderRadius: "1.5rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h2 style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          textAlign: "center"
        }}>Connexion</h2>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ fontSize: "0.875rem", fontWeight: "500" }}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrer votre email"
              style={{
                marginTop: "0.25rem",
                width: "100%",
                padding: "0.5rem 1rem",
                borderRadius: "1rem",
                border: "1px solid #d1d5db",
                outline: "none"
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.875rem", fontWeight: "500" }}>Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                marginTop: "0.25rem",
                width: "100%",
                padding: "0.5rem 1rem",
                borderRadius: "1rem",
                border: "1px solid #d1d5db",
                outline: "none"
              }}
            />
          </div>

          {error && (
            <p style={{ color: "red", fontSize: "0.875rem", textAlign: "center" }}>{error}</p>
          )}

          <button type="submit" disabled={loading} style={{
            backgroundColor: loading ? "#9ca3af" : "#2563eb",
            color: "#ffffff",
            padding: "0.75rem",
            border: "none",
            borderRadius: "1rem",
            cursor: "pointer",
            fontWeight: "bold"
          }}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p style={{
          marginTop: "1rem",
          fontSize: "0.875rem",
          textAlign: "center"
        }}>
          Pas de compte ?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "#2563eb",
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            S'inscrire
          </span>
        </p>
      </div>
    </div>
  );
}
