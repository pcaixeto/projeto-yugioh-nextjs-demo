'use client'
import Link from 'next/link'
import styles from './Card.module.css'

export default function Card({ image, name }) {
  const slug = encodeURIComponent(name)
  return (
    <Link href={`/${slug}`} className={styles.card}>
      <img src={image} alt={name} />
    </Link>
  )
}
