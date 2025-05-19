import { notFound } from 'next/navigation'
import styles from './page.module.css'

export default async function CardDetail({ params }) {
  const name = decodeURIComponent(params.cardName) // usamos decode e encodeURI pq os nomes das cartas vem cagado com espacos da API
  const res = await fetch(
    `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(name)}`
  )
  if (!res.ok) notFound()
  const { data } = await res.json()
  const card = data?.[0]
  if (!card) notFound()

return (
    <main className={styles.container}>
      <h1 className={styles.title}>{card.name}</h1>
      <img className={styles.image}
           src={card.card_images[0].image_url}
           alt={card.name} />
      <div className={styles.details}>
        <p><strong>Type:</strong> {card.type}</p>
        <p><strong>ATK:</strong> {card.atk}</p>
        <p><strong>DEF:</strong> {card.def}</p>
        <p><strong>Level:</strong> {card.level}</p>
        <p><strong>Attribute:</strong> {card.attribute}</p>
        <p><strong>Card Code:</strong> {card.card_code}</p>
      </div>
      <p className={styles.description}>{card.desc}</p>
    </main>
  )
}
