"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Normal Monster")
      .then((res) => {
        if (!res.ok) throw new Error("Erro na requisição");
        return res.json();
      })
      .then((data) => setCards(data.data.slice(0, 8)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando cartas...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Cartas Yu-Gi-Oh</h1>
      <p className={styles.subtitle}>Escolha uma carta para ver mais detalhes</p>

      <div className={styles.buttons}>
        <button className={styles.filter}>Monstros</button>
        <button className={styles.filter}>Armadilhas</button>
        <button className={styles.filter}>Magias</button>
      </div>

      <div className={styles.cardGrid}>
        {cards.map((card) => (
          <div key={card.id} className={styles.card}>
            <img src={card.card_images[0]?.image_url} alt={card.name} />
          </div>
        ))}
      </div>
    </main>
  );
}
