'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
      setIsDarkMode(savedMode === 'dark');
    } else {
      setIsDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    const newTheme = !isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark-mode', newTheme === 'dark');
  };

  return (
    <header className={styles.header}>
        
      
         <Link href="/">
          <img
            src="/images/logo-main.png"
            alt="Yu-Gi-Oh! Logo"
            className={styles.logoImage}
          />
        </Link>
        <button className={styles.themeButton} onClick={toggleTheme}>
          <img
            src={isDarkMode ? '/icons/sun-svgrepo-com.svg' : '/icons/moon-svgrepo-com.svg'}
            alt={isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
            className={styles.icon}
          />
        </button>
      
      
    </header>
  );
};

export default Header;
