import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Currency Exchange App</h1>
      <p className={styles.sub}>Converta moedas, acompanhe o histórico e exporte as cotações. Dados do Banco Central Europeu via Frankfurter.</p>
    </header>
  );
}
