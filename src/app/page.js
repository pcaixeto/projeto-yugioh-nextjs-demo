"use client";

import { useState, useEffect } from "react";

export default function YugiohProdeckPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Dark%20Magician")
      .then((res) => {
        if (!res.ok) throw new Error("Erro na requisição");
        return res.json();
      })
      .then((data) => setCards(data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando cards...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Yu-Gi-Oh! Cards</h1>
      <ul>
        {cards.map((card) => {
          const img = card.card_images?.[0]?.image_url;
          return (
            <li key={card.id} style={{ marginBottom: "2rem" }}>
              <h2>{card.name}</h2>
              {img && (
                <img
                  src={img}
                  alt={card.name}
                  style={{ width: "200px", height: "auto", display: "block" }}
                />
              )}
              <p><strong>Tipo:</strong> {card.type}</p>
              <p>{card.desc}</p>
              {card.atk != null && <p><strong>ATK:</strong> {card.atk}</p>}
              {card.def != null && <p><strong>DEF:</strong> {card.def}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
