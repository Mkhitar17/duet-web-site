import Link from "next/link";
import styles from "./layout.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>Մեր մասին</Link>
        <Link href="/about" className={styles.link}>Արտադրանք</Link>
        <Link href="/contact" className={styles.link}>Հումք</Link>
        <Link href="/contact" className={styles.link}>Կապ մեզ հետ</Link>
      </nav>
    </header>
  );
}