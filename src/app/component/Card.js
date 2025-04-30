import styles from "./Card.module.css";

export default function Card({ image, name }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} />
    </div>
  );
}
