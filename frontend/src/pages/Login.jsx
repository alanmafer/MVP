import { useNavigate } from "react-router-dom";
import COLORS from "../styles/colors";

/* ===============================
   Login Page
=============================== */

export default function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    // login visual por enquanto
    navigate("/teams");
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {/* =========================
            LADO ESQUERDO — BRANDING
        ========================== */}
        <div style={styles.left}>
          <Logo />

          <p style={styles.headline}>
            Contexto estatístico<br />
            para decisões melhores
          </p>

          <p style={styles.text}>
            Analise jogadores, linhas e cenários reais.
            Menos achismo. Mais contexto.
          </p>

          <ul style={styles.list}>
            <li>📊 Recência, mando e volume</li>
            <li>🧠 Dados acima de opinião</li>
            <li>⚙️ NBA hoje, outros esportes amanhã</li>
          </ul>
        </div>

        {/* =========================
            LADO DIREITO — LOGIN
        ========================== */}
        <div style={styles.right}>
          <h3 style={styles.title}>Entrar</h3>

          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="voce@email.com"
            style={styles.input}
          />

          <label style={styles.label}>Senha</label>
          <input
            type="password"
            placeholder="••••••••"
            style={styles.input}
          />

          <button style={styles.button} onClick={handleLogin}>
            Entrar
          </button>

          <p style={styles.disclaimer}>
            Login visual — autenticação real será implementada futuramente
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===============================
   Logo
=============================== */

function Logo() {
  return (
    <div style={{ marginBottom: 32 }}>
      <span style={{ fontSize: 26, fontWeight: 700, color: "#fff" }}>
        Line
      </span>
      <span
        style={{
          fontSize: 26,
          fontWeight: 700,
          marginLeft: 4,
          color: "#E0E7FF",
        }}
      >
        Context
      </span>

      <div
        style={{
          width: 36,
          height: 4,
          backgroundColor: "#fff",
          marginTop: 6,
          borderRadius: 2,
        }}
      />
    </div>
  );
}

/* ===============================
   Styles
=============================== */

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#F3F4F6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: 880,
    height: 500,
    display: "flex",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    backgroundColor: COLORS.background,
  },

  left: {
    flex: 1,
    background: `linear-gradient(135deg, ${COLORS.primary}, #1D4ED8)`,
    color: "#fff",
    padding: 48,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  headline: {
    fontSize: 28,
    lineHeight: 1.2,
    fontWeight: 600,
    marginBottom: 16,
  },

  text: {
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 24,
    lineHeight: 1.6,
  },

  list: {
    fontSize: 14,
    lineHeight: 1.8,
    paddingLeft: 18,
  },

  right: {
    flex: 1,
    padding: 48,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  title: {
    fontSize: 22,
    marginBottom: 24,
    color: COLORS.text,
  },

  label: {
    fontSize: 12,
    color: COLORS.muted,
    marginBottom: 4,
  },

  input: {
    padding: "10px 12px",
    borderRadius: 6,
    border: `1px solid ${COLORS.border}`,
    marginBottom: 16,
    fontSize: 14,
    outline: "none",
  },

  button: {
    marginTop: 8,
    padding: "12px",
    borderRadius: 8,
    border: "none",
    backgroundColor: COLORS.primary,
    color: "#fff",
    fontSize: 15,
    cursor: "pointer",
  },

  disclaimer: {
    marginTop: 12,
    fontSize: 11,
    color: COLORS.muted,
  },
};
