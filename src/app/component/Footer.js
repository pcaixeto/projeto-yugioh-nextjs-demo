'use client';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Yu-Gi-Oh! Projeto Exodia. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;
