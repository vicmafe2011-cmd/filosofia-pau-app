import { useState } from "react";

export default function App() {
  const [texto, setTexto] = useState("");
  const [nota, setNota] = useState(null);

  function corregir() {
    let score = 0;

    if (texto.length > 50) score += 2;
    if (texto.length > 120) score += 2;
    if (texto.toLowerCase().includes("kant")) score += 2;
    if (texto.toLowerCase().includes("juicio")) score += 2;
    if (texto.toLowerCase().includes("estético")) score += 2;

    setNota(score);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eef2ff, #ffffff)",
      padding: "30px",
      fontFamily: "Arial"
    }}>
      <h1 style={{ fontSize: "40px", fontWeight: "bold" }}>
        🎓 Aula Filosófica PRO
      </h1>

      <p style={{ color: "#555" }}>
        Entrena comentarios de texto para la PAU
      </p>

      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        marginTop: "20px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
      }}>
        <h2>📖 Texto de Kant</h2>

        <p style={{ marginTop: "10px" }}>
          “El juicio de gusto no es un juicio de conocimiento, sino estético.”
        </p>

        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe aquí tu comentario..."
          style={{
            width: "100%",
            height: "150px",
            marginTop: "15px",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={corregir}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            background: "#111",
            color: "white",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Corregir comentario
        </button>

        {nota !== null && (
          <div style={{
            marginTop: "20px",
            padding: "15px",
            background: "#eef2ff",
            borderRadius: "10px"
          }}>
            <h3>Nota: {nota}/10</h3>

            {nota >= 8 && <p>🔥 Muy buen comentario</p>}
            {nota >= 5 && nota < 8 && <p>👍 Bien, pero mejora conceptos</p>}
            {nota < 5 && <p>❗ Falta desarrollo</p>}
          </div>
        )}
      </div>
    </div>
  );
}