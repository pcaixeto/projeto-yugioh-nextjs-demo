import { notFound } from 'next/navigation'

export default async function CardDetail({ params }) {
  const name = decodeURIComponent(params.cardName)
  const res = await fetch(
    `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(name)}`
  )
  if (!res.ok) notFound()
  const { data } = await res.json()
  const card = data?.[0]
  if (!card) notFound()

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{card.name}</h1>
      <img src={card.card_images[0].image_url} alt={card.name} />
      <p><strong>Type:</strong> {card.type}</p>
      <p><strong>ATK:</strong> {card.atk}</p>
      <p><strong>DEF:</strong> {card.def}</p>
      <p><strong>Level:</strong> {card.level}</p>
      <p><strong>Attribute:</strong> {card.attribute}</p>
      <p><strong>Card Code:</strong> {card.card_code}</p>
      <p>{card.desc}</p>
    </main>
  )
}
