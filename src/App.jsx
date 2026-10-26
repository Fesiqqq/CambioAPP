import Header from './components/Header.jsx';
import CurrencyConverter from './components/CurrencyConverter.jsx';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <CurrencyConverter />
      </main>
    </div>
  );
}
