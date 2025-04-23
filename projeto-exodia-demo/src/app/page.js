"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function YugiohProdeckPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Dark%20Magician")
      .then((response) => {
        setCards(response.data.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando cards...</p>;
  }
  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Yu-Gi-Oh! Cards</h1>
      <ul>
        {cards.map((card) => (
          <li key={card.id} style={{ marginBottom: "1rem" }}>
            <h2>{card.name}</h2>
            <p><strong>Tipo:</strong> {card.type}</p>
            <p>{card.desc}</p>
            {card.atk != null && <p><strong>ATK:</strong> {card.atk}</p>}
            {card.def != null && <p><strong>DEF:</strong> {card.def}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
