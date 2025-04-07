import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    // Partie pour test sans backend (à supprimer plus tard)
    console.log("Inscription simulée avec :", email);
    navigate("/");

    // === Logique réelle à décommenter quand l'API est prête ===
    /*
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si besoin : localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError(data.message || "Erreur lors de l'inscription.");
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
        }}>Inscription</h2>

        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ fontSize: "0.875rem", fontWeight: "500" }}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
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

          <div>
            <label style={{ fontSize: "0.875rem", fontWeight: "500" }}>Confirmer le mot de passe</label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        <p style={{
          marginTop: "1rem",
          fontSize: "0.875rem",
          textAlign: "center"
        }}>
          Déjà un compte ?{" "}
          <span
            onClick={() => navigate("/")}
            style={{
              color: "#2563eb",
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            Se connecter
          </span>
        </p>
      </div>
    </div>
  );
}
